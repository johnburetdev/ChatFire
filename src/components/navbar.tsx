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
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/95 border-b shadow-sm">
      <nav className="container mx-auto p-4">
        <div className="flex items-center gap-1 md:gap-2">
          {navegation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-md transition-colors duration-200 flex items-center gap-2 text-sm hover:bg-accent",
                  isActive 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                )
              }
              end
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden md:inline">{item.name}</span>
            </NavLink>
          ))}
          <Button 
            onClick={logOut} 
            variant="ghost" 
            size="sm"
            className="ml-auto hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline ml-2">Logout</span>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
