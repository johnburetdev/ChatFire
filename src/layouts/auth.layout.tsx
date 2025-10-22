import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

const AuthLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  //Verificamos si el user esta logeado
  if (status === "loading" || !hasEmitted) {
    return <div>Loading...</div>;
  }
  //Dejamos que el usuario logeado tenga acceso, y mo tenga que volver a ver la pantalla de login
  if (status === "success" && signInCheckResult.signedIn) {
    return <Navigate to="/admin" replace />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
