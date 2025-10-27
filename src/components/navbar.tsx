import { useAuthActions } from "@/hooks/use-auth-actions";
import {
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  User,
} from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navegation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Messages", href: "/admin/chat", icon: MessageCircle },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Tasks", href: "/admin/tasks", icon: ClipboardCheck },
];
const Navbar = () => {
  const { logOut } = useAuthActions();

  return (
    <header className="shadow-md border-b">
      <nav className="p-4 flex gap-4">
        {navegation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "text=gray-700 hover:text-blue-800 flex items-center gap-2",
                isActive ? "text-blue-800 font-semibold" : "text-gray-700"
              )
            }
            end
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
        <Button onClick={logOut} className="ml-auto" variant={"destructive"}>
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
