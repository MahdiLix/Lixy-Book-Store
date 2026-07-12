import { useState } from "react";
import { Search } from "lucide-react";
import { ui } from "../../styles/ui";

const POPULAR_CATEGORIES = [
  "Memory books",
  "Novels",
  "Story books",
  "Travel books",
  "Poetry books",
  "Biography books",
  "Religious books",
  "Knowledge books",
  "Children's books",
];

const NEW_CATEGORIES = [
  "Memory books",
  "Novels",
  "Story books",
  "Travel books",
  "Poetry books",
];

 
export default function CategorySidebar({ onChange }) {
  const [filterTerm, setFilterTerm] = useState("");
  const [checked, setChecked] = useState({});

  function toggle(key) {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    onChange?.(next);
  }

  function renderGroup(title, items, prefix) {
    const visible = filterTerm
      ? items.filter((c) => c.toLowerCase().includes(filterTerm.toLowerCase()))
      : items;

    if (!visible.length) return null;

    return (
      <div className="mb-6">
        <h3 className={ui.searchSidebarGroupTitleUnderline}>{title}</h3>
        {visible.map((category) => {
          const key = `${prefix}:${category}`;
          return (
            <label key={key} className={ui.searchSidebarRow}>
              <input
                type="checkbox"
                checked={Boolean(checked[key])}
                onChange={() => toggle(key)}
                className={ui.searchSidebarCheckbox}
              />
              {category}
            </label>
          );
        })}
      </div>
    );
  }

  return (
    <aside className={ui.searchSidebar}>
      <div className={ui.searchSidebarSearch}>
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          placeholder="Search categories and..."
          className={ui.searchSidebarSearchInput}
        />
      </div>

      {renderGroup("Popular Categories", POPULAR_CATEGORIES, "popular")}
      {renderGroup("New Books Categories", NEW_CATEGORIES, "new")}
    </aside>
  );
}