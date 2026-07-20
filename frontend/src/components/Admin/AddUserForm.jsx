import UserFormFields from "./UserFormFields";
import { ui } from "../../styles/ui";

export default function AddUserForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
}) {
  return (
    <div className={ui.card}>
      <div className={ui.cardBody}>
        <h3 className={ui.sectionTitle}>Add New Account</h3>
        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
          <UserFormFields
            formData={formData}
            setFormData={setFormData}
            isEditMode={false}
            showRole={false}
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" className={ui.primaryBtn}>
              Create Account
            </button>
            <button
              type="button"
              onClick={onCancel}
              className={ui.secondaryBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
