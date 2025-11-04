import { useAuthActions } from "@/hooks/use-auth-actions";
import {
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  User,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navegation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Messages", href: "/admin/chat", icon: MessageCircle },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Tasks", href: "/admin/tasks", icon: ClipboardCheck },
];
const Navbar = () => {
  const { logOut } = useAuthActions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo/Brand with chat icon */}
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg text-primary">ChatFire</span>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navegation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : "text-muted-foreground hover:bg-accent/50"
                  )
                }
                end
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </NavLink>
            ))}

            <Button
              onClick={logOut}
              variant="ghost"
              size="sm"
              className="ml-2 hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
          <div className="space-y-1 pb-3 pt-2">
            {navegation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent/50"
                  )
                }
                onClick={() => setIsMenuOpen(false)}
                end
              >
                <span className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </span>
              </NavLink>
            ))}

            <Button
              onClick={() => {
                setIsMenuOpen(false);
                logOut();
              }}
              variant="ghost"
              size="sm"
              className="w-full justify-start px-3 py-2 hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
