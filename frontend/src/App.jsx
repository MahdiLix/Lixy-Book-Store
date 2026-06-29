import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BooksSearchPage from "./pages/BooksSearchPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import AdminBooksPage from "./pages/admin/AdminBooksPage";
import AddBookPage from "./pages/admin/AddBookPage";
import EditBookPage from "./pages/admin/EditBookPage";
import ProtectedRoute from "./components/Shared/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/search" element={<BooksSearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<CartPage />} />

      <Route
        path="/admin/books"
        element={
          <ProtectedRoute>
            <AdminBooksPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add"
        element={
          <ProtectedRoute>
            <AddBookPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit/:id"
        element={
          <ProtectedRoute>
            <EditBookPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/books" replace />} />
    </Routes>
  );
}