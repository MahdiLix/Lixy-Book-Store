import { Route } from "react-router-dom";
import ProtectedRoute from "../components/Ui/ProtectedRoute";

import UsersManagementPage from "../pages/admin/UsersManagementPage";
import AdminsManagementPage from "../pages/admin/AdminsManagementPage";
import AdminBooksPage from "../pages/admin/AdminBooksPage";
import AddBookPage from "../pages/admin/AddBookPage";
import EditBookPage from "../pages/admin/EditBookPage";

export default function AdminRoutes() {
  return (
    <>
      <Route
        path="/user/users"
        element={
          <ProtectedRoute requiredRoles={["admin", "superadmin"]}>
            <UsersManagementPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/admins"
        element={
          <ProtectedRoute requiredRoles={["superadmin"]}>
            <AdminsManagementPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/books"
        element={
          <ProtectedRoute requiredRoles={["admin", "superadmin"]}>
            <AdminBooksPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add"
        element={
          <ProtectedRoute requiredRoles={["admin", "superadmin"]}>
            <AddBookPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit/:id"
        element={
          <ProtectedRoute requiredRoles={["admin", "superadmin"]}>
            <EditBookPage />
          </ProtectedRoute>
        }
      />
    </>
  );
}
