import { ui } from "../../styles/ui";

export default function Card({ children }) {
  return <section className={ui.card}>{children}</section>;
}