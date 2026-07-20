import { ui } from "../../styles/ui";

export default function SectionTitle({ title, subtitle, right }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className={ui.title}>{title}</h2>
        {subtitle ? <p className={ui.subtitle}>{subtitle}</p> : null}
      </div>
      {right ? <div>{right}</div> : null}
    </div>
  );
}