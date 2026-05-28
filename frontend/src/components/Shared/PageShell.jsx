import { ui } from "../../styles/ui";

export default function PageShell({ children }) {
  return <div className={ui.page}>{children}</div>;
}