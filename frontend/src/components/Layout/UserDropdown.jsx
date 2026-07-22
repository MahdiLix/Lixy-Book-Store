import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Settings,
  Users,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import {
  clearAuthToken,
  getUserInfo,
  isLoggedIn,
  getUserRole,
} from "../../utils/auth";
import { ui } from "../../styles/ui";

export default function UserDropdown({ onClose }) {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const user = getUserInfo();
  const role = getUserRole();

  function handleLogout() {
    clearAuthToken();
    onClose();
    navigate("/", { replace: true });
  }

  return (
    <div className={ui.dropdownPanel}>
      {loggedIn ? (
        <>
          <div className={ui.dropdownHeader}>
            <p className={ui.dropdownName}>{user?.username || "User"}</p>
            <p className={ui.dropdownEmail}>{user?.email || ""}</p>
          </div>
          <div className={ui.dropdownDivider} />

          <Link to="/cart" onClick={onClose} className={ui.dropdownItem}>
            <ShoppingCart size={16} /> Shopping Cart
          </Link>
          <Link
            to="/user/profile"
            onClick={onClose}
            className={ui.dropdownItem}
          >
            <User size={16} /> My Profile
          </Link>
          <Link
            to="/account/update"
            onClick={onClose}
            className={ui.dropdownItem}
          >
            <Settings size={16} /> Update Account
          </Link>

          {/* Admin & SuperAdmin Management Links */}
          {(role === "admin" || role === "superadmin") && (
            <>
              <div className={ui.dropdownDivider} />
              <Link
                to="/admin/books"
                onClick={onClose}
                className={ui.dropdownItem}
              >
                <BookOpen size={16} /> Manage Books
              </Link>
              <Link
                to="/user/users"
                onClick={onClose}
                className={ui.dropdownItem}
              >
                <Users size={16} /> Manage Users
              </Link>
            </>
          )}

          {/* SuperAdmin ONLY Management Link */}
          {role === "superadmin" && (
            <Link
              to="/admin/admins"
              onClick={onClose}
              className={ui.dropdownItem}
            >
              <ShieldCheck size={16} /> Manage Admins
            </Link>
          )}

          <div className={ui.dropdownDivider} />
          <button
            onClick={handleLogout}
            className={`${ui.dropdownItem} text-rose-600 dark:text-rose-400 w-full`}
          >
            <LogOut size={16} /> Logout
          </button>
        </>
      ) : (
        <>
          <div className={ui.dropdownHeader}>
            <p className={ui.dropdownName}>Welcome to Lixy Store</p>
            <p className={ui.dropdownEmail}>Access your account features</p>
          </div>
          <div className={ui.dropdownDivider} />
          <Link to="/login" onClick={onClose} className={ui.dropdownItem}>
            <LogIn size={16} /> Login
          </Link>
          <Link
            to="/user/register"
            onClick={onClose}
            className={ui.dropdownItem}
          >
            <UserPlus size={16} /> Register
          </Link>
        </>
      )}
    </div>
  );
}
