import { Route, Routes } from "react-router";

import RootLayout from "./layouts/root.layout";
import PublicLayout from "./layouts/public.layout";
import AdminLayout from "./layouts/admin.layout";
import AuthLayout from "./layouts/auth.layout";

import HomePage from "./pages/public/home.page";
import NotFound from "./pages/public/not-found";
import DashbordPage from "./pages/admin/dashboard.page";
import ChatPage from "./pages/admin/chat.page";
import ProfilePage from "./pages/admin/profile.page";
import LoginPage from "./pages/auth/login.page";
import RegisterPage from "./pages/auth/register.page";
import TaskPage from "./pages/admin/task.page";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Rutas publicas */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Rutas privadas */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<DashbordPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Rutas de autenticacion */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
