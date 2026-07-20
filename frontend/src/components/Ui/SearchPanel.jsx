import { useState } from "react";
import SearchBookForm from "../Books/SearchBookForm";
import { ui } from "../../styles/ui";

 
export default function SearchPanel({ searchTerm, setSearchTerm, onSearch }) {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <section className={`${ui.card} relative z-30`}>
        <div className={`${ui.cardBody} flex justify-center`}>
          <SearchBookForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={(e) => {
              setFocused(false);
              onSearch(e);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
      </section>

      {focused && <div className={ui.overlay} />}
    </>
  );
}