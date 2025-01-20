import UserMenu from "@/component/UserMenu";
import { MobileSidebar } from "@/components/mobile-sidebar";
import DropdownMenuBar from "@/components/DropdownMenuBar";

const ReportsLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
 

  return ( 
    <div className="h-full relative pt-2">
    <div className="flex w-full justify-between pl-5 pr-5"> {/* Add padding to the container */}
      <div className="mr-5">
        <DropdownMenuBar />
      </div>
      <div className="ml-5">
        <UserMenu />
      </div>
    </div>
    <main className="p-5 pb-10">
      {children}
    </main>
  </div>
  
   );
}
 
export default ReportsLayout;
