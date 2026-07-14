import { ui } from "../../styles/ui";
import {TOP_GENRES} from "../../constants/genres";

export default function GenreBar({
  genres = TOP_GENRES,
  onSelectGenre,
  activeGenre,
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