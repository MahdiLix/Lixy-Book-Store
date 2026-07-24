import { Link } from "react-router-dom";
import { BookX, Home, BookOpen } from "lucide-react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { ui } from "../styles/ui";

export default function NotFoundPage() {
  return (
    <main className={ui.page}>
      <Header />

      <div
        className={`${ui.pageTopSpace} flex-grow flex items-center justify-center`}
      >
        <div className="text-center px-4 py-20">
          {/* 404 Visual */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* FIXED: Added indigo gradient so it's highly visible in light and dark mode */}
              <h1 className="text-[120px] sm:text-[160px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 select-none leading-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center"></div>
            </div>
          </div>

          {/* Text Content */}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Oops! Page not found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
            We can't seem to find the page you're looking for. It might have
            been moved, deleted, or perhaps it never existed.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/" className={ui.primaryBtn}>
              <Home size={18} className="mr-2" /> Back to Home
            </Link>
            <Link to="/books" className={ui.ghostBtn}>
              <BookOpen size={18} className="mr-2" /> Browse Books
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
