import { ui } from "../../styles/ui";

export default function UserFormFields({ formData, setFormData, isEditMode = false, showRole = true }) {
  return (
    <div className="flex flex-col gap-4">
      <input
        className={ui.input}
        type="text"
        placeholder="Username *"
        value={formData.username}
        onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
      />
      
      <input
        className={ui.input}
        type="email"
        placeholder="Email *"
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
      />

      {showRole && isEditMode && (
        <select
          className={ui.select}
          value={formData.role}
          onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>
      )}

      {/* Only show password field when CREATING a new user */}
      {!isEditMode && (
        <input
          className={ui.input}
          type="password"
          placeholder="Password *"
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
        />
      )}
    </div>
  );
}