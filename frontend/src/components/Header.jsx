import { Link, useNavigate } from "react-router-dom";
import { clearAuthToken, isLoggedIn } from "../utils/auth";
import { useTheme } from "../context/ThemeContext";
import { ui } from "../styles/ui";

export default function Header({
  subtitle = "",
  loginRedirectTo = "/login",
  logoutRedirectTo = "/books",
}) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const loggedIn = isLoggedIn();

  function handleAuthClick() {
    if (loggedIn) {
      clearAuthToken();
      navigate(logoutRedirectTo, { replace: true });
      return;
    }

    navigate(loginRedirectTo);
  }

  return (
    <header className={ui.fixedHeader}>
      <div className={`${ui.container} ${ui.headerGrid}`}>
        <div className="flex items-center justify-start">
          <Link to="/cart" className={ui.ghostBtn}>
            🛒 Cart
          </Link>
        </div>

        <div className="flex flex-col items-center text-center py-3">
          <Link to="/books" className={ui.headerTitle}>
            Lixy Book Store
          </Link>
          {subtitle ? (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={toggleTheme} className={ui.iconBtn}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          <button type="button" onClick={handleAuthClick} className={ui.ghostBtn}>
            {loggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
}