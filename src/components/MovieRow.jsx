// D:\js\movie_explore\cinescope\src\components\MovieRow.jsx
import MovieCard from "./MovieCard";
import { useRef } from "react";
function MovieRow({
  title,
  movies,
  favorites,
  toggleFavorite
}) {
    const rowRef = useRef(null);
    function scrollLeft() {
  rowRef.current.scrollBy({
    left: -500,
    behavior: "smooth"
  });
}
// rowRef.current در واقع همان div مربوط به لیست فیلم‌ها خواهد بود
function scrollRight() {
  rowRef.current.scrollBy({
    left: 500,
    behavior: "smooth"
  });
}
  return (
    <section className="movie-row">

     <div className="movie-row-header">
  <h2>{title}</h2>

  <div className="movie-row-buttons">
    <button onClick={scrollLeft}>←</button>
    <button onClick={scrollRight}>→</button>
  </div>
</div>

<div
  className="movie-row-list"
  ref={rowRef}
>
  {movies.map((movie) => (
    <MovieCard
      key={movie.id}
      movie={movie}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  ))}
</div>

    </section>
  );
}

export default MovieRow;