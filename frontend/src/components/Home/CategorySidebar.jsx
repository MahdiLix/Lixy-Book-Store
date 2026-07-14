import { useState } from "react";
import { Search } from "lucide-react";
import { ui } from "../../styles/ui";
import { TOP_GENRES } from "../../constants/genres";
 
export default function CategorySidebar({ onSelectGenre, selectedGenre }) {
  const [filterTerm, setFilterTerm] = useState("");

  const filteredGenres = filterTerm
    ? TOP_GENRES.filter((g) => g.toLowerCase().includes(filterTerm.toLowerCase()))
    : TOP_GENRES;

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

      <div className="mb-6">
        <h3 className={ui.searchSidebarGroupTitleUnderline}>Popular Categories</h3>
        {filteredGenres.map((genre) => (
          <label key={genre} className={ui.searchSidebarRow}>
            <input
              type="checkbox"
              name="genre-sidebar"
              checked={selectedGenre === genre}
              onChange={() => onSelectGenre?.(genre)}
              className={ui.searchSidebarCheckbox}
            />
            {genre}
          </label>
        ))}
      </div>
    </aside>
  );
}