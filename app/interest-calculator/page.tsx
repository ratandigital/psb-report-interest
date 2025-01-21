'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoanForm = () => {
  const [disbursementAmount, setDisbursementAmount] = useState<number>(0);
  const [paidPrincipal, setPaidPrincipal] = useState<number>(0);
  const [loanOverdueDate, setLoanOverdueDate] = useState<string>('');
  const [loanPaymentDate, setLoanPaymentDate] = useState<string>('');
  const [extraInterestAmount, setExtraInterestAmount] = useState<number | null>(null);
  const [diffDays, setDiffDays] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  // New input states
  const [memberName, setMemberName] = useState<string>('');
  const [memberCode, setMemberCode] = useState<string>('');
  const [accountNo, setAccountNo] = useState<string>('');
  const [loanType, setLoanType] = useState<string>('Interest on Microcredit'); // Default loan type

  const router = useRouter();

  // Calculate Outstanding Principal Amount automatically
  const outstandingPrincipal = disbursementAmount - paidPrincipal;

  const calculateExtraInterest = () => {
    const loanOverdue = new Date(loanOverdueDate);
    const loanPayment = new Date(loanPaymentDate);
    const baseDate = new Date('2025-01-01');

    let interest = 0;

    if (loanOverdue > baseDate && loanOverdue < loanPayment) {
      const diffBeforeOverdue = Math.ceil((loanOverdue.getTime() - baseDate.getTime()) / (1000 * 3600 * 24));
      const diffAfterOverdue = Math.ceil((loanPayment.getTime() - loanOverdue.getTime()) / (1000 * 3600 * 24));

      const interestBeforeOverdue = (disbursementAmount * 0.02 * diffBeforeOverdue) / 360;
      const interestAfterOverdue = (outstandingPrincipal * 0.02 * diffAfterOverdue) / 360;

      interest = interestBeforeOverdue + interestAfterOverdue;

      setDiffDays(diffBeforeOverdue + diffAfterOverdue);
    } else if (loanPayment <= loanOverdue) {
      const diff = Math.ceil((loanPayment.getTime() - baseDate.getTime()) / (1000 * 3600 * 24));
      setDiffDays(diff);
      interest = (disbursementAmount * 0.02 * diff) / 360;
    } else {
      const diff = Math.ceil((loanPayment.getTime() - baseDate.getTime()) / (1000 * 3600 * 24));
      setDiffDays(diff);
      interest = (outstandingPrincipal * 0.02 * diff) / 360;
    }

    const roundedInterest = Math.round(interest * 100) / 100;

    setExtraInterestAmount(roundedInterest);
    setIsCalculated(true);
  };

  const generateVoucher = () => {
    const queryParams = new URLSearchParams({
      disbursementAmount: disbursementAmount.toString(),
      paidPrincipal: paidPrincipal.toString(),
      outstandingPrincipal: outstandingPrincipal.toString(),
      extraInterestAmount: extraInterestAmount?.toString() || '0',
      diffDays: diffDays.toString(),
      loanOverdueDate: loanOverdueDate,
      loanPaymentDate: loanPaymentDate,
      memberName: memberName,
      memberCode: memberCode,
      accountNo: accountNo,
      loanType: loanType,
    }).toString();

    window.open(`/voucher?${queryParams}`, '_blank');
  };

  return (
    <>
      <div>
        <h2 className="text-center mt-8 text-2xl md:text-3xl font-semibold">Extra Interest Calculator</h2>
      </div>
      <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
        {/* Member Name */}

        {/* Member Code */}
    

        {/* Account No */}


   {/* Loan Type */}



        {/* Disbursement Amount */}
        <div className="mb-4">
          <label htmlFor="disbursementAmount" className="block text-sm font-semibold">Disbursement Amount</label>
          <input
            id="disbursementAmount"
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={disbursementAmount || ''}
            onChange={(e) => setDisbursementAmount(Number(e.target.value))}
          />
        </div>

        {/* Paid Principal */}
        <div className="mb-4">
          <label htmlFor="paidPrincipal" className="block text-sm font-semibold">Paid Principal Amount (Before 01.01.2025)</label>
          <input
            id="paidPrincipal"
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={paidPrincipal || ''}
            onChange={(e) => setPaidPrincipal(Number(e.target.value))}
          />
        </div>

        {/* Outstanding Principal */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Outstanding Principal Amount (01.01.2025)</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            value={outstandingPrincipal}
            readOnly
          />
        </div>

        {/* Loan Overdue Date */}
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

        {/* Loan Payment Date */}
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
          Calculate
        </button>

        {isCalculated && (
          <button
            onClick={generateVoucher}
            className="w-full mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Generate Voucher
          </button>
        )}

        {extraInterestAmount !== null && (
          <div className="mt-4">
            <strong>Extra Interest Amount: </strong>
            {extraInterestAmount.toFixed(0)}
          </div>
        )}
      </div>
    </>
  );
};

export default LoanForm;
