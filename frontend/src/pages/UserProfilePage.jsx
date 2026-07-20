import { Navigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import { isLoggedIn, getUserInfo } from "../utils/auth";
import { ui } from "../styles/ui";

export default function UserProfilePage() {
  if (!isLoggedIn()) {
    return <Navigate to="/user/login" replace />;
  }

  const user = getUserInfo();

  return (
    <main className={ui.page}>
      <Header />
      <div className={ui.pageTopSpace}>
        <div className={ui.container}>
          <div className="mx-auto max-w-2xl">
            <h1 className={`${ui.sectionTitle} mb-6 text-2xl`}>My Profile</h1>

            <div className={ui.card}>
              <div className={ui.cardBody}>
                <div className="mb-4">
                  <p className={ui.sectionSub}>Username</p>
                  <p className="text-lg font-medium text-slate-900 dark:text-white">
                    {user?.username || "N/A"}
                  </p>
                </div>

                <div className="mb-4">
                  <p className={ui.sectionSub}>Email Address</p>
                  <p className="text-lg font-medium text-slate-900 dark:text-white">
                    {user?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className={ui.sectionSub}>Account Type</p>
                  <p className="text-lg font-medium text-slate-900 dark:text-white">
                    {user?.role
                      ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                      : "User"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
