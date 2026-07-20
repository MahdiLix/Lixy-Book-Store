import { Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage";
import BooksSearchPage from "./pages/BooksSearchPage";
import LoginPage from "./pages/LoginPage"; // Single Login Page
import UserRegisterPage from "./pages/UserRegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserUpdatePage from "./pages/UserUpdatePage";
import UsersManagementPage from "./pages/admin/UsersManagementPage";
import AdminsManagementPage from "./pages/admin/AdminsManagementPage"; // NEW
import CartPage from "./pages/CartPage";
import AdminBooksPage from "./pages/admin/AdminBooksPage";
import AddBookPage from "./pages/admin/AddBookPage";
import EditBookPage from "./pages/admin/EditBookPage";
import ProtectedRoute from "./components/Ui/ProtectedRoute";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/search" element={<BooksSearchPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/register" element={<UserRegisterPage />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/account/update" element={<UserUpdatePage />} />

        <Route path="/cart" element={<CartPage />} />

        {/* Admin & SuperAdmin Protected Routes */}
        <Route
          path="/user/users"
          element={
            <ProtectedRoute requiredRoles={["admin", "superadmin"]}>
              <UsersManagementPage />
            </ProtectedRoute>
          }
        />

        {/* SuperAdmin ONLY Protected Route */}
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartProvider>
  );
}
