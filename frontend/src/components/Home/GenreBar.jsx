import { useState } from "react";
import { ui } from "../../styles/ui";

const DEFAULT_GENRES = [
  "Fiction",
  "Love",
  "Novel",
  "History",
  "Science fiction",
  "Fantastic",
  "More",
];

export default function GenreBar({ genres = DEFAULT_GENRES, onSelectGenre }) {
  const [active, setActive] = useState(genres[0]);

  function handleClick(genre) {
    setActive(genre);
    onSelectGenre?.(genre);
  }

  return (
    <nav className={ui.genreBar}>
      {genres.map((genre) => (
        <span
          key={genre}
          onClick={() => handleClick(genre)}
          className={genre === active ? ui.genreItemActive : ui.genreItem}
        >
          {genre}
        </span>
      ))}
    </nav>
  );
}