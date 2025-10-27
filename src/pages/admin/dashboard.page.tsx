import { Button } from "@/components/ui/button";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { useUser } from "reactfire";

const DashbordPage = () => {
  const { data: user } = useUser();
  const { logOut } = useAuthActions();

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome, {user?.displayName || "Guest"}!</p>
      <p>Email: {user?.email || "Not provided"}</p>
      <Button variant={"destructive"} onClick={logOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default DashbordPage;
