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
import SearchBookForm from "../Books/SearchBookForm";
import UserDropdown from "./UserDropdown";
import { isLoggedIn } from "../../utils/auth";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import { ui } from "../../styles/ui";

const LOGO_SRC = "/lixystoreblue-logo.png";

export default function Header({
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const term = searchTerm !== undefined ? searchTerm : internalTerm;
  const setTerm = setSearchTerm || setInternalTerm;

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
            <img
              src={LOGO_SRC}
              alt="Lixy Store logo"
              className={ui.homeLogoImg}
            />
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
            {/* Hidden on small screens to keep only search & profile */}
            <button
              type="button"
              className={`${ui.homeIconBtn} hidden sm:flex`}
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </button>
            <button
              type="button"
              className={`${ui.homeIconBtn} hidden sm:flex`}
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>
            <button
              type="button"
              className={`${ui.homeIconBtn} hidden sm:flex`}
              aria-label="Language"
            >
              <Globe size={20} />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className={`${ui.homeIconBtn} hidden sm:flex`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/cart" className={ui.cartIconBtn} aria-label="Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className={ui.cartBadge}>{cartCount}</span>
              )}
            </Link>

            {/* User Avatar Dropdown Logic */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={ui.homeAvatarBtn}
                aria-label="User menu"
              >
                <User size={20} />
              </button>

              {isDropdownOpen && (
                <>
                  {/* Invisible backdrop to close dropdown when clicking outside */}
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  {/* The dropdownPanel class in ui.js now handles right-0 and z-40 */}
                  <div className={ui.dropdownPanel}>
                    <UserDropdown onClose={() => setIsDropdownOpen(false)} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {searchFocused && <div className={ui.overlay} />}
    </>
  );
}