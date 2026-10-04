// D:\js\movie_explore\cinescope\src\pages\Favorites.jsx
import MovieCard from "../components/MovieCard";

function Favorites({ favorites, toggleFavorite }) {
  return (
    <section className="page">
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <div className="cards">{favorites.map((movie) => (<MovieCard
  key={movie.id}
  movie={movie}
  favorites={favorites}
  toggleFavorite={toggleFavorite}
/>))}</div>
      )}
    </section>
  );
}

export default Favorites;