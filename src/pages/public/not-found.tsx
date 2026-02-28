import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { NavLink } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold tracking-tight">
          Page not found
        </h2>
        <p className="text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <NavLink to="/">
          <Button variant="outline" className="gap-2">
            <MoveLeft className="h-4 w-4" />
            Go back home
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
