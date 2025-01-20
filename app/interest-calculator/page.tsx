'use client'
import { useState } from 'react';

const LoanForm = () => {
  const [disbursementAmount, setDisbursementAmount] = useState<number>(0);
  const [paidPrincipal, setPaidPrincipal] = useState<number>(0);
  const [loanOverdueDate, setLoanOverdueDate] = useState<string>('');
  const [loanPaymentDate, setLoanPaymentDate] = useState<string>('');
  const [extraInterestAmount, setExtraInterestAmount] = useState<number | null>(null);

  // Calculate Outstanding Principal Amount automatically
  const outstandingPrincipal = disbursementAmount - paidPrincipal;

  const calculateExtraInterest = () => {
    const loanOverdue = new Date(loanOverdueDate);
    const loanPayment = new Date(loanPaymentDate);

    let interest = 0;
    if (loanPayment <= loanOverdue) {
      const diffDays = Math.ceil((loanPayment.getTime() - new Date('2025-01-01').getTime()) / (1000 * 3600 * 24));
      interest = (outstandingPrincipal * 0.02 * diffDays) / 360;
    } else {
      const diffDays = Math.ceil((loanPayment.getTime() - new Date('2025-01-01').getTime()) / (1000 * 3600 * 24));
      interest = (disbursementAmount * 0.02 * diffDays) / 360;
    }

    // Round the interest amount to 2 decimal places
    const roundedInterest = Math.round(interest * 100) / 100;
    setExtraInterestAmount(roundedInterest);
  };

  return (
    <>
      <div>
        <h2 className="text-center mt-8 text-2xl md:text-3xl font-semibold">Extra Interest Calculator</h2>
      </div>
      <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="disbursementAmount" className="block text-sm font-semibold">Disbursement Amount</label>
          <input
            id="disbursementAmount"
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={disbursementAmount}
            onChange={(e) => setDisbursementAmount(Number(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="paidPrincipal" className="block text-sm font-semibold">Paid Principal Amount</label>
          <input
            id="paidPrincipal"
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={paidPrincipal}
            onChange={(e) => setPaidPrincipal(Number(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Outstanding Principal Amount</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            value={outstandingPrincipal}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="loanOverdueDate" className="block text-sm font-semibold">Loan Overdue Date</label>
          <input
            id="loanOverdueDate"
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={loanOverdueDate}
            onChange={(e) => setLoanOverdueDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="loanPaymentDate" className="block text-sm font-semibold">Loan Payment Date</label>
          <input
            id="loanPaymentDate"
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={loanPaymentDate}
            onChange={(e) => setLoanPaymentDate(e.target.value)}
          />
        </div>

        <button
          onClick={calculateExtraInterest}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Calculate Extra Interest
        </button>

        {extraInterestAmount !== null && (
          <div className="mt-4">
            <strong>Extra Interest Amount: </strong>
            {extraInterestAmount.toFixed(2)}
          </div>
        )}
      </div>
    </>
  );
};

export default LoanForm;
