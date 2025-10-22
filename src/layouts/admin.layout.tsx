import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

const AdminLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  //Verificamos si el user esta logeado
  if (status === "loading" || !hasEmitted) {
    return <div>Loading...</div>;
  }

  //Redirigimos el usuario sin credenciales al logiNpage
  if (!signInCheckResult.signedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminLayout;
