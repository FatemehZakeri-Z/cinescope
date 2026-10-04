// D:\js\movie_explore\cinescope\src\pages\Movies.jsx
import MovieCard from "../components/MovieCard";
function Movies({movies, loading, error,favorites,toggleFavorite}) {
  return (
    <section className="page">
      <h1>Movies</h1>
      <div className="cards">
        {loading ? (
          <p className="status">Loading movies...</p>
        ) : error ? (
          <p className="status">{error}</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
  key={movie.id}
  movie={movie}
  favorites={favorites}
  toggleFavorite={toggleFavorite}
/>
          ))
        ) : (
          <p className="status">No movies found.</p>
        )}
      </div>
    </section>
  );
}

export default Movies;