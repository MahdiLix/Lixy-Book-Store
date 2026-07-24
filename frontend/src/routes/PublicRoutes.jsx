import { Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import BooksPage from "../pages/BooksPage";
import BookDetailPage from "../pages/BookDetailPage";
import BooksSearchPage from "../pages/BooksSearchPage";
import LoginPage from "../pages/LoginPage";
import UserRegisterPage from "../pages/UserRegisterPage";
import UserProfilePage from "../pages/UserProfilePage";
import UserUpdatePage from "../pages/UserUpdatePage";
import CartPage from "../pages/CartPage";
import NotFoundPage from "../pages/404";

export default function PublicRoutes() {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:id" element={<BookDetailPage />} />
      <Route path="/search" element={<BooksSearchPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/register" element={<UserRegisterPage />} />
      <Route path="/user/profile" element={<UserProfilePage />} />
      <Route path="/account/update" element={<UserUpdatePage />} />

      <Route path="/cart" element={<CartPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </>
  );
}
