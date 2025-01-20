"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google';
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import routes from '@/lib/routes';

import { cn } from "@/lib/utils";
import DailyTransactionModal from "@/component/DailyTransactionModal"; // Import the modal component
import AddBranchModal from '@/component/AddBranchModal';

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });


export const Sidebar = () => {
  const pathname = usePathname();
  const [isDailyTransactionModalOpen, setIsDailyTransactionModalOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);

  // Function to open the modal
  const openDailyTransactionModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default link behavior
    setIsDailyTransactionModalOpen(true); // Open the modal
  };
  const openDailyUserModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default link behavior
    setAddMemberModalOpen(true); // Open the modal
  };
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            PSB Reports
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            route.label === "Daily Transaction Create" ? (
              <button
                key={route.href}
                onClick={openDailyTransactionModal}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </button>
            ):  route.label === "Add Member" ? (
              <button
                key={route.href}
                onClick={openDailyUserModal}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </button>
            ) : (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            )
          ))}
        </div>
      </div>

      {/* Conditionally render the DailyTransactionModal */}
      {isDailyTransactionModalOpen && (
        <DailyTransactionModal onClose={() => setIsDailyTransactionModalOpen(false)} />
      )}

{addMemberModalOpen && (
        <AddBranchModal onClose={() => setAddMemberModalOpen(false)} />
      )}
    </div>
  );
};
