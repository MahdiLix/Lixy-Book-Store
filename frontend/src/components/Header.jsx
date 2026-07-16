import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Bell,
  Globe,
  ShoppingCart,
  Sun,
  Moon,
  User,
} from "lucide-react";
import SearchBookForm from "./Books/SearchBookForm";
import { clearAuthToken, isLoggedIn } from "../utils/auth";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { ui } from "../styles/ui";

const LOGO_SRC = "/lixystoreblue-logo.png";

export default function Header({
  loginRedirectTo = "/login",
  logoutRedirectTo = "/",
  searchTerm,
  setSearchTerm,
  onSearch,
  searchPlaceholder = "Search for the book you want and read it now... Sherlock Holmes, Harry Pot...",
}) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const loggedIn = isLoggedIn();

  const [internalTerm, setInternalTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const term = searchTerm !== undefined ? searchTerm : internalTerm;
  const setTerm = setSearchTerm || setInternalTerm;

  function handleAvatarClick() {
    clearAuthToken();
    navigate(logoutRedirectTo, { replace: true });
  }

  function handleLoginClick() {
    navigate(loginRedirectTo);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!term?.trim()) return;
    setSearchFocused(false);
    if (onSearch) {
      onSearch(e);
      return;
    }
    navigate(`/search?search=${encodeURIComponent(term.trim())}`);
  }

  return (
    <>
      <header className={ui.homeHeader}>
        <div className={`${ui.homeHeaderRow} relative z-30`}>
          <Link to="/" className={ui.homeLogoLink}>
            <img src={LOGO_SRC} alt="Lixy Store logo" className={ui.homeLogoImg} />
            <span className={ui.homeLogoText}>Lixy Store</span>
          </Link>

          <SearchBookForm
            variant="header"
            searchTerm={term}
            setSearchTerm={setTerm}
            onSearch={handleSearchSubmit}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder={searchPlaceholder}
          />

          <div className={ui.homeHeaderActions}>
            <button type="button" className={ui.homeIconBtn} aria-label="Wishlist">
              <Heart size={20} />
            </button>
            <button type="button" className={ui.homeIconBtn} aria-label="Notifications">
              <Bell size={20} />
            </button>
            <button type="button" className={ui.homeIconBtn} aria-label="Language">
              <Globe size={20} />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className={ui.homeIconBtn}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Cart icon with badge */}
            <Link to="/cart" className={ui.cartIconBtn} aria-label="Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className={ui.cartBadge}>{cartCount}</span>}
            </Link>

            {loggedIn ? (
              <button
                type="button"
                onClick={handleAvatarClick}
                className={ui.homeAvatarBtn}
                aria-label="Log out"
                title="Log out"
              >
                <User size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLoginClick}
                className={ui.homeLoginBtn}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {searchFocused && <div className={ui.overlay} />}
    </>
  );
}