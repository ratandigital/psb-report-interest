import { useState } from 'react';
import bangladeshData from './bangladeshData';

interface AddBranchModalProps {
  onClose: () => void;
}

const branchFields = [
  { label: 'Division', name: 'divisionName', type: 'select' },
  { label: 'District', name: 'districtName', type: 'select' },
  { label: 'Branch Name (Upazila)', name: 'branchName', type: 'select' },
  { label: 'Branch Code', name: 'branchCode', type: 'number' },
  { label: 'Password', name: 'password', type: 'password' },
];

export default function AddBranchModal({ onClose }: AddBranchModalProps) {
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'branchCode' ? parseInt(value) : value }));
  };

  const handleSubmit = async () => {
    if (!formData.divisionName || !formData.districtName || !formData.branchName || !formData.branchCode || !formData.password) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/addBranch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message);
        onClose();
        alert('Branch added successfully!');
      } else {
        setErrorMessage(result.errors || 'Failed to add branch');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const districts = formData.divisionName
    ? Object.keys(bangladeshData[formData.divisionName]?.districts || {})
    : [];

  const upazilas = formData.divisionName && formData.districtName
    ? bangladeshData[formData.divisionName]?.districts[formData.districtName] || []
    : [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-[40%] max-w-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-gray-500 mb-4">Add New Branch</h2>

        {errorMessage && (
          <div className="mb-4 text-red-500">
            {errorMessage}
          </div>
        )}

        <form className="space-y-4 custom-text">
          {branchFields.map((field) => (
            <div key={field.name}>
              <label className="block mb-2 text-gray-700">{field.label}</label>
              {field.type === 'select' ? (
   <select
   name={field.name}
   value={formData[field.name] || ''} // Ensure the value is set correctly
   onChange={handleChange}
   className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
 >
   {/* Placeholder option */}
   <option value="" disabled className="text-gray-400">
     Select {field.label}
   </option>
 
   {/* Rendering division options */}
   {field.name === 'divisionName' &&
     Object.keys(bangladeshData).map((division) => (
       <option key={division} value={division} className="text-gray-700">
        <p>{division}</p>  
       </option>
     ))}
 
   {/* Rendering district options */}
   {field.name === 'districtName' &&
     districts.map((district) => (
       <option key={district} value={district} className="text-gray-700">
         {district}
       </option>
     ))}
 
   {/* Rendering upazila options */}
   {field.name === 'branchName' &&
     upazilas.map((upazila) => (
       <option key={upazila.branchCode} value={upazila.branchName} className="text-gray-700">
         {upazila.branchName}
       </option>
     ))}
 </select>
 
    
        
           
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-gray-600" // Added text-red-600 to input
                  placeholder={field.label}
                />
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-600 text-white rounded-md"
          >
            Add Branch
          </button>
        </form>
      </div>
    </div>
  );
}
