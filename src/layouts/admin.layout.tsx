import Navbar from "@/components/navbar";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { useSigninCheck, useUser } from "reactfire";

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
    <Suspense fallback={<div>Loading user...</div>}>
      <AuthhrnticatedLayout />
    </Suspense>
  );
};

export default AdminLayout;

const AuthhrnticatedLayout = () => {
  useUser({
    suspense: true,
  });

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};
