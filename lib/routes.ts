import { Code, AsteriskIcon, LayoutDashboard,  Music, Settings, User2Icon, TextIcon, VideoIcon  } from "lucide-react";

const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: "text-sky-500"
    },
    {
      label: 'Daily Transaction Create',
      icon: TextIcon,
      href: '/conversation',
      color: "text-violet-500",
    },
    {
      label: 'Add Member',
      icon: User2Icon,
      color: "text-pink-700",
      href: '/add-member',
    },
    {
      label: 'Monthly Report',
      icon: TextIcon,
      color: "text-pink-700",
      href: '#',
    },
    {
      label: 'Fixed Assets',
      icon: AsteriskIcon,
      color: "text-orange-700",
      href: '#',
    },
    {
      label: 'Leave Management',
      icon: Music,
      color: "text-emerald-500",
      href: '#',
    },
    {
      label: 'Bank Register',
      icon: TextIcon,
      color: "text-green-700",
      href: '#',
    },
    {
      label: 'Weely Report',
      icon: TextIcon,
      href: '#',
    },
   
  ];

  export default routes
