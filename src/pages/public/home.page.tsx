import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { NavLink } from "react-router";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            <MessageCircle className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-primary">ChatFire</h1>
          </div>

          <p className="text-xl text-muted-foreground">
            Connect with friends and stay in touch with our real-time chat
            application.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NavLink to="/auth/login" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto min-w-[150px]"
            >
              Login
            </Button>
          </NavLink>
          <NavLink to="/auth/register" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto min-w-[150px]">Register</Button>
          </NavLink>
        </div>
      </div>

      <footer className="absolute bottom-0 w-full border-t">
        <div className="container mx-auto h-14 flex items-center justify-center">
          <p className="text-sm text-center text-muted-foreground">
            Built with React & Firebase
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
