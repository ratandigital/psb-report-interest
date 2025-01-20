'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import bangladeshData from '@/component/bangladeshData'; // Adjust path as necessary
type Upazila = {
  branchName: string;
};
interface DailyTransaction {
  id: string;
  createdAt: string;
  division: string;
  district: string;
  upazila: string;
  newSavingsAccounts: number;
  newDPSAccounts: number;
  newLoanAccounts: number;
  oldSavingsAccounts: number;
  oldDPSAccounts: number;
  oldLoanAccounts: number;
  savingsCollection: number;
  loanCollectionRegular: number;
  loanCollectionSMA: number;
  loanCollectionCL: number;
  loanDisbursement: number;
  savingsWithdrawn: number;
  operatingExpenses: number;
  totalDebitPosting: number;
  totalCreditPosting: number;
  cumulativeProfile: number;
  cashInHand: number;
  status: string;
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<DailyTransaction[]>([]);
  
  const [filters, setFilters] = useState({
    division: '',
    district: '',
    upazila: '',
    startDate: '',
    endDate: '',
  });
  const [districts, setDistricts] = useState<string[]>([]);
  const [upazilas, setUpazilas] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchReports = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get('/api/reports', {
        params: { ...filters, page, pageSize: 10 },
      });
      setReports(response.data.reports);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setLoading(false);
    }
  };

  const handleDivisionChange = (division: string) => {
    setFilters((prev) => ({ ...prev, division, district: '', upazila: '' }));
    if (division) {
      const selectedDivision = bangladeshData[division];
      setDistricts(Object.keys(selectedDivision.districts));
      setUpazilas([]);
    } else {
      setDistricts([]);
      setUpazilas([]);
    }
  };

 
  const handleDistrictChange = (district: string) => {
    setFilters((prev) => ({ ...prev, district, upazila: '' }));
    if (district && filters.division) {
      // Fetch the list of upazilas for the selected district
      const selectedDistrict = bangladeshData[filters.division]?.districts[district];
  
      // If upazilas are found, map them to names for dropdown
      const upazilaNames = selectedDistrict 
        ? selectedDistrict.map((upazila: Upazila) => upazila.branchName) 
        : [];
  
      setUpazilas(upazilaNames);  // Set the upazilas state
    } else {
      setUpazilas([]);  // Reset upazilas if no district or division is selected
    }
  };
  
  const handleFilter = () => {
    fetchReports(1);
  };

  const handleReset = () => {
    setFilters({
      division: '',
      district: '',
      upazila: '',
      startDate: '',
      endDate: '',
    });
    setDistricts([]);
    setUpazilas([]);
    setCurrentPage(1);
  };
  

  // Fetch reports whenever filters or pagination changes (including reset)
  useEffect(() => {
    fetchReports(1);
  }, [filters]);

  useEffect(() => {
    fetchReports(currentPage); // Re-fetch when currentPage changes
  }, [currentPage]);

  // Calculate totals for numeric columns
  const calculateTotals = () => {
    const totals = {
      newSavingsAccounts: 0,
      newDPSAccounts: 0,
      newLoanAccounts: 0,
      oldSavingsAccounts: 0,
      oldDPSAccounts: 0,
      oldLoanAccounts: 0,
      savingsCollection: 0,
      loanCollectionRegular: 0,
      loanCollectionSMA: 0,
      loanCollectionCL: 0,
      loanDisbursement: 0,
      savingsWithdrawn: 0,
      operatingExpenses: 0,
      cashInHand: 0,
      totalDebitPosting: 0,
      totalCreditPosting: 0,
      cumulativeProfile: 0,
    };

    reports.forEach((report) => {
      totals.newSavingsAccounts += report.newSavingsAccounts;
      totals.newDPSAccounts += report.newDPSAccounts;
      totals.newLoanAccounts += report.newLoanAccounts;
      totals.oldSavingsAccounts += report.oldSavingsAccounts;
      totals.oldDPSAccounts += report.oldDPSAccounts;
      totals.oldLoanAccounts += report.oldLoanAccounts;
      totals.savingsCollection += report.savingsCollection;
      totals.loanCollectionRegular += report.loanCollectionRegular;
      totals.loanCollectionSMA += report.loanCollectionSMA;
      totals.loanCollectionCL += report.loanCollectionCL;
      totals.loanDisbursement += report.loanDisbursement;
      totals.savingsWithdrawn += report.savingsWithdrawn;
      totals.operatingExpenses += report.operatingExpenses;
      totals.totalDebitPosting += report.totalDebitPosting;
      totals.totalCreditPosting += report.totalCreditPosting;
      totals.cumulativeProfile += report.cumulativeProfile;
      totals.cashInHand += report.cashInHand;
    });

    return totals;
  };
  const handlePrint = () => {
    const printWindow = document.getElementById('prinArea') as HTMLElement;
    if (printWindow) {
      const printContent = printWindow.innerHTML;
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write('<html><head><title>Print</title>');
        newWindow.document.write('<style>');
        newWindow.document.write(`
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
          }
          th {
            background-color: #f2f2f2;
          }
             h1 {
            text-align: center;
          }
          .table-container {
            border: 1px solid #000;
            padding: 10px;
          }
        `);
        newWindow.document.write('</style>');
        newWindow.document.write('</head><body>');
        newWindow.document.write('<div class="table-container">');
        newWindow.document.write(printContent);
        newWindow.document.write('</div>');
        newWindow.document.write('</body></html>');
        newWindow.document.close();
        newWindow.print();
      }
    } else {
      console.error("Element to print not found");
    }
  };
  
  
  
  
  
  const totals = calculateTotals();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
     

      {/* Filter Section */}
      <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Division:</label>
          <select
            value={filters.division}
            onChange={(e) => handleDivisionChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select Division</option>
            {Object.keys(bangladeshData).map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">District:</label>
          <select
            value={filters.district}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            disabled={!filters.division}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
    <div className="flex-1">
  <label className="block text-sm font-medium text-gray-700">Upazila:</label>
  <select
    value={filters.upazila}
    onChange={(e) => setFilters((prev) => ({ ...prev, upazila: e.target.value }))}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
    disabled={!filters.district}
  >
    <option value="">Select Upazila</option>
    {upazilas.map((upazila) => (
      <option key={upazila} value={upazila}>
        {upazila}
      </option>
    ))}
  </select>
</div>

        {/* <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Apply Filters
        </button> */}
 <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
  {/* Division and District Inputs */}
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700">Start Date:</label>
    <input
      type="date"
      value={filters.startDate}
      onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
    />
  </div>
  
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700">End Date:</label>
    <input
      type="date"
      value={filters.endDate}
      onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
    />
  </div>
  
  {/* Division, District, and Upazila Inputs */}
  {/* Existing fields for Division, District, and Upazila */}
  
  {/* <button
    onClick={handleFilter}
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
  >
    Apply Filters
  </button> */}
  <button
    onClick={handleReset}
    className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
  >
    Reset Filters
  </button>
  <button
    onClick={handlePrint}
    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
  >
    Print
  </button>
</div>

      </div>
      
      {/* Table Section */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto" id='prinArea'>
          <h1 className="text-center text-2xl font-bold mb-6">Daily Report</h1>
               <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-blue-500 text-white border-b border-gray-300">
       <tr>
    {/* <th rowSpan={2}>Sl. No</th>   */}
    <th colSpan={1} rowSpan= {2} className="text-center py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Date</th>
    <th rowSpan= {2} className="text-center py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Division</th>
    <th rowSpan= {2} className="text-center py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">District</th>
     <th rowSpan= {2} className="text-center py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Upazila</th> 
      <th colSpan={4} className="text-center py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-b border-gray-300">Accounts Opening</th> {/* Use colSpan as a number */}
      <th colSpan={4} className="text-center py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-b border-gray-300">Account Closing</th>
      <th colSpan={5} className="text-center py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-b border-gray-300">Total Collection</th>
      <th colSpan={4} className="text-center py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-b border-gray-300">Total Payment</th>
      <th colSpan={1} rowSpan= {2} className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Balance</th>
      <th colSpan={1} rowSpan= {2} className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Cash In Hand</th>
      <th colSpan={3} className="text-center py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-b border-gray-300">Total Posting</th>
      <th colSpan={1} rowSpan= {2} className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Cumulative Profit</th>
  
             
    </tr>
              <tr>
                
       
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Savings</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">DPS</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Loan</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Total</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Savings</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">DPS</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Loan</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Total</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Savings</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Loan Regular</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Loan SMA</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Loan CL</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Total</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Loan Disbursement</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Savings Withdrawn</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Operating Expenses</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Total</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Debit</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Credit</th>
                <th className="py-3 px-4 text-left text-xs font-semibold  tracking-wide border-r border-gray-300">Total</th>
            </tr>
            </thead>
            <tbody className="text-gray-700">
              {reports.map((report) => (
                <tr key={report.id} className="border-b hover:bg-gray-100">
                        <td className="py-3 px-4 text-sm border-r border-gray-300">
                    {format(new Date(report.createdAt), 'yyyy-MM-dd')}
                  </td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.division}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.district}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.upazila}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.newSavingsAccounts}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.newDPSAccounts}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.newLoanAccounts}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.newLoanAccounts + report.newDPSAccounts + report.newSavingsAccounts}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.oldSavingsAccounts}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.oldDPSAccounts}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.oldLoanAccounts}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.oldLoanAccounts + report.oldDPSAccounts + report.oldSavingsAccounts}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.savingsCollection}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.loanCollectionRegular}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.loanCollectionSMA}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.loanCollectionCL}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.loanCollectionCL + report.loanCollectionSMA + report.loanCollectionRegular + report.savingsCollection}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.loanDisbursement}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.savingsWithdrawn}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.operatingExpenses}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.operatingExpenses + report.savingsWithdrawn + report.loanDisbursement}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{(report.loanCollectionCL + report.loanCollectionSMA + report.loanCollectionRegular + report.savingsCollection) - (report.operatingExpenses + report.savingsWithdrawn + report.loanDisbursement)}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.cashInHand}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.totalDebitPosting}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.totalCreditPosting}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.totalCreditPosting + report.totalDebitPosting}</td>
                        <td className="py-3 px-4 text-sm border-r border-gray-300">{report.cumulativeProfile}</td>
                       
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-3 px-4 text-sm font-semibold text-gray-600" colSpan={4}>
                  Total
                </td>
                      <td className="py-3 px-4 text-sm border-l border-r border-gray-300">{totals.newSavingsAccounts}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.newDPSAccounts}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.newLoanAccounts}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{(totals.newLoanAccounts) + (totals.newDPSAccounts) + (totals.newSavingsAccounts)}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.oldSavingsAccounts}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.oldDPSAccounts}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.oldLoanAccounts}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{(totals.oldLoanAccounts) + (totals.oldDPSAccounts) + (totals.oldSavingsAccounts)}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.savingsCollection}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.loanCollectionRegular}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.loanCollectionSMA}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.loanCollectionCL}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{(totals.loanCollectionCL) + (totals.loanCollectionSMA) + (totals.loanCollectionRegular) + (totals.savingsCollection)}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.loanDisbursement}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.savingsWithdrawn}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.operatingExpenses}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{(totals.loanDisbursement) + (totals.savingsWithdrawn) + (totals.operatingExpenses)}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">-</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">-</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.totalDebitPosting}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.totalCreditPosting}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{(totals.totalCreditPosting) + (totals.totalDebitPosting)}</td>
                      <td className="py-3 px-4 text-sm border-r border-gray-300">{totals.cumulativeProfile}</td>
                 
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-4">
  <button
    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    disabled={currentPage === 1}
  >
    Previous
  </button>
  <span className="flex items-center justify-center">
    Page {currentPage} of {totalPages}
  </span>
  <button
    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>

    </div>
  );
};

export default ReportsPage;