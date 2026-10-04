// D:\js\movie_explore\cinescope\src\components\MovieCard.jsx
import { Link } from "react-router-dom";

function MovieCard({ movie, favorites, toggleFavorite }) {

  const isFavorite = favorites.some(
    (favorite) => favorite.id === movie.id
  );

  return (
    <div className="movie-card">

      <Link to={`/movie/${movie.id}`}>

        <div className="movie-poster">

          <img
            src={movie.poster}
            alt={movie.title}
            onError={(e) => {
              e.target.src = "/placeholder-poster.png";
            }}
          />

          <div className="poster-overlay"></div>

          <span className="rating-badge">
            ⭐ {movie.rating.toFixed(1)}
          </span>

          <div className="movie-card-content">
            <h3>{movie.title}</h3>
            <span>{movie.year}</span>
          </div>

        </div>

      </Link>

      <button
        className="favorite-btn"
        onClick={() => toggleFavorite(movie)}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

    </div>
  );
}

export default MovieCard;