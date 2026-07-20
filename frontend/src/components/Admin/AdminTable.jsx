import { ui } from "../../styles/ui";

export default function UsersTable({ users, onEdit, onRemove }) {
  if (!users || users.length === 0) {
    return <div className={ui.notice}>No Users Found!</div>;
  }

  return (
    <div className={ui.tableWrap}>
      <table className={ui.table}>
        <thead>
          <tr>
            <th className={ui.th}>Username</th>
            <th className={ui.th}>Email</th>
            <th className={ui.th}>Role</th>
            <th className={ui.th}>Edit</th>
            <th className={ui.th}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className={ui.tr}>
              <td className={`${ui.td} rounded-l-2xl`}>
                {user.username || "—"}
              </td>
              <td className={ui.td}>{user.email || "—"}</td>
              <td className={ui.td}>{user.role || "user"}</td>
              <td className={ui.td}>
                <button
                  type="button"
                  onClick={() => onEdit(user._id)}
                  className={ui.secondaryBtn}
                >
                  Edit
                </button>
              </td>
              <td className={`${ui.td} rounded-r-2xl`}>
                <button
                  type="button"
                  onClick={() => onRemove(user._id)}
                  className={ui.dangerBtn}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
