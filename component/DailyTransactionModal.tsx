"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DailyTransactionModalProps {
  onClose: () => void;
}

interface TransactionData {
  newSavingsAccounts?: number;
  newDPSAccounts?: number;
  newLoanAccounts?: number;
  oldSavingsAccounts?: number;
  oldDPSAccounts?: number;
  oldLoanAccounts?: number;
  savingsCollection?: number;
  loanCollectionRegular?: number;
  loanCollectionSMA?: number;
  loanCollectionCL?: number;
  loanDisbursement?: number;
  savingsWithdrawn?: number;
  operatingExpenses?: number;
  totalDebitPosting?: number;
  totalCreditPosting?: number;
  cumulativeProfile?: number;
  cashInHand?: number;
  [key: string]: number | undefined;
}

const transactionSteps = [
  {
    title: "Accounts Opening",
    fields: [
      { label: "New Savings Accounts Open", type: "number", name: "newSavingsAccounts" },
      { label: "New DPS/Scheme Accounts Open", type: "number", name: "newDPSAccounts" },
      { label: "New Loan Accounts Open", type: "number", name: "newLoanAccounts" },
      { label: "Total Accounts", type: "number", name: "TotalAccounts" },
    ],
  },
  {
    title: "Accounts Closed",
    fields: [
      { label: "Old Savings Accounts Close", type: "number", name: "oldSavingsAccounts" },
      { label: "Old DPS/Scheme Accounts Close", type: "number", name: "oldDPSAccounts" },
      { label: "Old Loan Accounts Close", type: "number", name: "oldLoanAccounts" },
      { label: "Total Accounts Close", type: "number", name: "TotalAccountsClose" },
    ],
  },
  {
    title: "Collections",
    fields: [
      { label: "Savings/DPS Collection", type: "number", name: "savingsCollection" },
      { label: "Loan Collection Regular/STD", type: "number", name: "loanCollectionRegular" },
      { label: "Loan Collection SMA", type: "number", name: "loanCollectionSMA" },
      { label: "Loan Collection CL", type: "number", name: "loanCollectionCL" },
      { label: "Total Collection", type: "number", name: "TotalCollection" },
    ],
  },
  {
    title: "Payments",
    fields: [
      { label: "Loan Disbursement", type: "number", name: "loanDisbursement" },
      { label: "Savings/DPS Withdrawn", type: "number", name: "savingsWithdrawn" },
      { label: "Operating Expenses", type: "number", name: "operatingExpenses" },
      { label: "Total Expenses", type: "number", name: "TotalExpenses" },
    ],
  },
  {
    title: "Posting Details",
    fields: [
      { label: "Total Debit Posting", type: "number", name: "totalDebitPosting" },
      { label: "Total Credit Posting", type: "number", name: "totalCreditPosting" },
      { label: "Total Posting", type: "number", name: "TotalPosting" },
    ],
  },
  {
    title: "Cumulative Profile",
    fields: [
   
      { label: "Cumulative Profit", type: "number", name: "cumulativeProfile" },
    ],
  },
  {
   
    fields: [

      { label: "Previous Cash In hand", type: "number", name: "cashInHand" },
    ],
  },
];

export default function DailyTransactionModal({ onClose }: DailyTransactionModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [cashInHandSt, setCashInHandSt] = useState(0);
  const [cashInHand, setCashInHand] = useState(0);
  const [formData, setFormData] = useState<TransactionData>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("transactionData");
      return savedData ? JSON.parse(savedData) : {};
    }
    return {};
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactionData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: TransactionData) => ({
      ...prevData,
      [name]: parseInt(value) || 0,
    }));
  };
  const validateStep = () => {
    // Get required fields for the current step
    let requiredFields = transactionSteps[currentStep].fields.map((field) => field.name);
  
    // Exclude cashInHand from validation if cashInHandSt is not null or 0
    if (cashInHandSt !== null && cashInHandSt !== 0) {
      requiredFields = requiredFields.filter((field) => field !== "cashInHand");
    }
  
    // Validate required fields
    for (let field of requiredFields) {
      if (!formData[field] && formData[field] !== 0) {
        setErrorMessage(`Please fill in all fields.`);
        return false;
      }
    }
  
    setErrorMessage(null); // Clear error message if validation passes
    return true;
  };
  

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => setCurrentStep(currentStep - 1);

  const handleConfirm = async () => {
    if (validateStep()) {
      setLoading(true);

      try {
        const response = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success("Transaction saved successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          localStorage.removeItem("transactionData");
          onClose();
        } else {
          setErrorMessage(result.error || "Failed to save transaction");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Failed to save transaction");
      } finally {
        setLoading(false);
      }
    }
  };

  const totalAccounts =
    (formData.newSavingsAccounts || 0) +
    (formData.newDPSAccounts || 0) +
    (formData.newLoanAccounts || 0);
  const totalAccountsClose =
    (formData.oldSavingsAccounts || 0) +
    (formData.oldDPSAccounts || 0) +
    (formData.oldLoanAccounts || 0);
  const totalCollection =
    (formData.savingsCollection || 0) +
    (formData.loanCollectionRegular || 0) +
    (formData.loanCollectionSMA || 0) +
    (formData.loanCollectionCL || 0);
  const totalExpenses =
    (formData.loanDisbursement || 0) +
    (formData.savingsWithdrawn || 0) +
    (formData.operatingExpenses || 0);
  const totalPosting =
    (formData.totalDebitPosting || 0) + (formData.totalCreditPosting || 0);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      TotalAccounts: totalAccounts,
      TotalAccountsClose: totalAccountsClose,
      TotalCollection: totalCollection,
      TotalExpenses: totalExpenses,
      TotalPosting: totalPosting,
    }));
  }, [
    formData.newSavingsAccounts,
    formData.newDPSAccounts,
    formData.newLoanAccounts,
    formData.oldSavingsAccounts,
    formData.oldDPSAccounts,
    formData.oldLoanAccounts,
    formData.savingsCollection,
    formData.loanCollectionRegular,
    formData.loanCollectionSMA,
    formData.loanCollectionCL,
    formData.loanDisbursement,
    formData.savingsWithdrawn,
    formData.operatingExpenses,
    formData.totalDebitPosting,
    formData.totalCreditPosting,
    formData.cashInHand,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/daily-transactions");

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
       
         
          setCashInHandSt(data.cashInHand);
        
      console.log(data.cashInHand)
      } catch (error) {
        
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 backdrop-blur-sm z-50 overflow-y-auto max-h-[500px]">
  
    <div className="relative bg-white rounded-lg shadow-lg p-6 w-[40%] max-w-lg">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        &times;
      </button>

      <h2 className="text-xl font-bold text-gray-600 mb-4">Daily Transaction</h2>

      {errorMessage && (
        <div className="mb-4 text-red-500 font-bold">{errorMessage}</div>
      )}

<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
  <h3 className="text-lg font-semibold text-gray-500 mb-4">
    {transactionSteps[currentStep].title}
  </h3>

  {/* Dynamically include fields during mapping */}
  {transactionSteps[currentStep].fields.map((field) => {
  // Conditionally include the `cashInHand` field during mapping
  if (
    currentStep === transactionSteps.length - 1 &&
    field.name === "cashInHand" &&
    (cashInHandSt === null || cashInHandSt === 0)
  ) {
    return (
      <div key={field.name}>
        <label className="block mb-2 text-gray-700">{field.label}</label>
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name] || ''}
          onChange={handleChange}
          className="w-full px-3 py-1 mb-1 text-gray-700 border border-gray-300 rounded-md"
        />
      </div>
    );
  }

  // Skip rendering `cashInHand` if condition is not met
  if (field.name === "cashInHand") return null;

  // Render other fields normally
  return (
    <div key={field.name}>
      <label className="block mb-2 text-gray-700">{field.label}</label>
      <input
        type={field.type}
        name={field.name}
        value={formData[field.name] || ''}
        onChange={handleChange}
        className="w-full px-3 py-1 mb-1 text-gray-700 border border-gray-300 rounded-md"
      />
    </div>
  );
})}

</form>


      <div className="flex justify-between items-center mt-4">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Previous
          </button>
        )}

        {currentStep < transactionSteps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Confirm'}
          </button>
        )}
      </div>
    </div>
  </div>
);
}