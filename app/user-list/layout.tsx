import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const UserLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
 

  return ( 
    <div className="h-full relative">
     
     
        <Navbar />
        {children}
     
    </div>
   );
}
 
export default UserLayout;
