function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={movie.poster}
          alt={movie.title}
          onError={(e) => {
            e.target.src = "/placeholder-poster.png";
          }}
        />

        <span className="rating-badge">
          ⭐ {movie.rating.toFixed(1)}
        </span>

        <div className="poster-overlay"></div>
      </div>

      <h3>{movie.title.toUpperCase()}</h3>

      <div className="movie-info">
        <span>{movie.year}</span>
      </div>
    </div>
  );
}

export default MovieCard;