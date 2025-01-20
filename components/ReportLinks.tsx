'use client';

type ReportLinksProps = {
  isApproved: boolean;
  isManagement: boolean;
  isAdmin: boolean;
};

export function ReportLinks({ isApproved, isManagement, isAdmin }: ReportLinksProps) {
  const openInNewWindow = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="absolute right-0  w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <div className="p-2">
        {isApproved && (
          <button
            onClick={() => openInNewWindow('/daily-report')}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Daily Report
          </button>
        )}
        {isManagement && (
          <button
            onClick={() => openInNewWindow('/reports')}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            All Reports
          </button>
        )}
        {isAdmin && (
          <>
            <button
              onClick={() => openInNewWindow('/user-list')}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              User List
            </button>
            <button
              onClick={() => openInNewWindow('/admin-list')}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Admin List
            </button>
            <button
            onClick={() => openInNewWindow('/reports')}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            All Reports
          </button>
          </>
        )}
      </div>
    </div>
  );
}
