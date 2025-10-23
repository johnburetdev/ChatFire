import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAuthActions } from "../../hooks/use-auth-actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LoginPage = () => {
  const { loginWithGoogle } = useAuthActions();

  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      console.log("login successful");
    } else {
      console.error("Login failed:", result.error);
      toast.error("Login failed");
    }
  };

  return (
    <Card>
      <CardHeader>
        Login
        <CardDescription>
          Login to your account using email and password or Google.
        </CardDescription>
      </CardHeader>

      <CardContent>...</CardContent>
      <CardFooter>
        <Button onClick={handleLoginWithGoogle} className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
