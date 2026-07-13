import { ui } from "../../styles/ui";
import { GENRES } from "../../constants/genres";

export default function GenreBar({
  genres = GENRES,
  onSelectGenre,
  activeGenre="Fiction",
}) {
  function handleClick(genre) {
    onSelectGenre?.(genre);
  }

  return (
    <nav className={ui.genreBar}>
      {genres.map((genre) => (
        <span
          key={genre}
          onClick={() => handleClick(genre)}
          className={genre === activeGenre ? ui.genreItemActive : ui.genreItem}
        >
          {genre}
        </span>
      ))}
    </nav>
  );
}