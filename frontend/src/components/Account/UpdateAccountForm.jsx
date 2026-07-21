import { ui } from "../../styles/ui";

export default function UpdateAccountForm({
  username,
  email,
  role,
  currentPassword,
  newPassword,
  setUsername,
  setEmail,
  setRole,
  setCurrentPassword,
  setNewPassword,
  handleSubmit,
  loading,
  showRole = false,
  requireCurrentPassword = false,
  submitButtonText = "Update Account",
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className={`${ui.card} ${ui.cardBody} flex flex-col gap-4`}
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={ui.input}
          placeholder="Enter username"
          disabled={loading}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={ui.input}
          placeholder="Enter email"
          disabled={loading}
        />
      </div>

      {/* Show Role dropdown only for Admin editing in Management Pages */}
      {showRole && (
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={ui.select}
            disabled={loading}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>
      )}

      {/* Show Password fields ONLY if it's the self-update page */}
      {requireCurrentPassword && (
        <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            Change Password (Optional)
          </p>
          <div className="mb-4">
            <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={ui.input}
              placeholder="Required to save changes"
              disabled={loading}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-500 dark:text-slate-400">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={ui.input}
              placeholder="Leave blank to keep current"
              disabled={loading}
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`${ui.primaryBtn} mt-4`}
      >
        {loading ? "Updating..." : submitButtonText}
      </button>
    </form>
  );
}
