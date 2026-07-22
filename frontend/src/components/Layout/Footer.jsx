import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import { ui } from "../../styles/ui";

const LOGO_SRC = "/lixystoreblue-logo.png";

export default function Footer() {
  return (
    <footer className={ui.footer}>
      <div className={ui.homeContainer}>
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-4">
          {/* Brand & Socials */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src={LOGO_SRC}
                alt="Lixy Store logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-semibold text-slate-900 dark:text-white">
                Lixy Store
              </span>
            </Link>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
              Create Book, Better you
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 max-w-xs">
              Your premier destination for books of all genres. Discover, read,
              and grow with Lixy Store.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={ui.footerSocialIcon}
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className={ui.footerSocialIcon}
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={16} />
              </a>
              <a
                href="https://github.com/MahdiLix/Lixy-Book-Store"
                target="_blank"
                rel="noreferrer"
                className={ui.footerSocialIcon}
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/mahdi-rad-896809416/"
                target="_blank"
                rel="noreferrer"
                className={ui.footerSocialIcon}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
          {/* Shop Links */}
          <div className="md:col-span-1">
            <h3 className={ui.footerHeading}>Shop</h3>
            <ul className="flex flex-col gap-3 mt-4">
              <li>
                <Link to="/books" className={ui.footerLink}>
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/search?genre=Love" className={ui.footerLink}>
                  Love
                </Link>
              </li>
              <li>
                <Link to="/books" className={ui.footerLink}>
                  New Release
                </Link>
              </li>
            </ul>
          </div>

          {/* My Account Links */}
          <div className="md:col-span-1">
            <h3 className={ui.footerHeading}>My Account</h3>
            <ul className="flex flex-col gap-3 mt-4">
              <li>
                <Link to="/user/profile" className={ui.footerLink}>
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className={ui.footerLink}>
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className={ui.footerLink}>
                  Login / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-1">
            <h3 className={ui.footerHeading}>Contact Us</h3>
            <ul className="flex flex-col gap-4 mt-4">
              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Phone size={16} className="text-indigo-500" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Mail size={16} className="text-indigo-500" />
                <span>mahdirprog2005@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <MapPin size={16} className="text-indigo-500" />
                <span>Tehran, Iran</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 py-6 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Lixy Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
