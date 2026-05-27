import { Navigate, Route, Routes } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import LoginPage from "./pages/LoginPage";
import AdminBooksPage from "./pages/admin/AdminBooksPage";
import EditBookPage from "./pages/admin/EditBookPage";
import ProtectedRoute from "./components/Shared/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/books" replace />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin/books"
        element={
          <ProtectedRoute>
            <AdminBooksPage />
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