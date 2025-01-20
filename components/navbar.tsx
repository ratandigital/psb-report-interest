import UserMenu from "@/component/UserMenu";
import { MobileSidebar } from "@/components/mobile-sidebar";
import DropdownMenuBar from "./DropdownMenuBar";


const Navbar = async () => {


  return ( 
    <div className="flex items-center p-4">
      <MobileSidebar/>
      <div className="flex w-full justify-end">
        <div className="mr-5"><DropdownMenuBar/></div>
        <div><UserMenu/>

        </div>
 
      </div>
    
    </div>
       
   );
}
 
export default Navbar;
