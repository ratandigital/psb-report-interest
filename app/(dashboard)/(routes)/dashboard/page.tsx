"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import axios from 'axios';
import { tools } from "@/constants";


export default function HomePage() {
  const [reports, setReports] = useState<any[]>([]); // Add type for reports if possible
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchReports = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get('/api/top-branch');
      // Adjusted response handling
      setReports(response.data); // Directly use the response data as it's already an array
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(1); // Initial fetch
  }, []);

  return (
    <div>
   
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mt-5">
          Top Collected Branch
        </h2>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {loading ? (
          <p>Loading...</p> // Loading state
        ) : (
          reports.map((report) => (
            <Card key={report.branchCode} className="p-4 border-black/5 flex items-center justify-center hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-x-4">
                <div className="font-semibold">
                  Branch: {report.branchCode},  Branch Name: {report.upazila}, Total Collection: {report.totalCollection}
                </div>
              </div>
            
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
