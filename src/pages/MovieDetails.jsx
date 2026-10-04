// D:\js\movie_explore\cinescope\src\pages\MovieDetails.jsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";


function MovieDetails({ favorites, toggleFavorite }) {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const isFavorite = favorites.some((favorite) => favorite.id === movie?.id);
    // اگر movie وجود داشت، id را بده؛ اگر هنوز null بود، خطا نده.

    function handleFavorite() {
  const favoriteMovie = {
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? movie.release_date.split("-")[0] : "----",
    rating: movie.vote_average,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };

  toggleFavorite(favoriteMovie);
}
    
    useEffect(() => {
  async function fetchMovie() {
  try {
    setError("");

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setMovie(data);

    } catch (error) {
  console.log(error);
  setError("Couldn't load movie details.");
}
  }

  fetchMovie();

}, [id]);
    // هر وقت id تغییر کرد، دوباره اجرا شود
  

  return (
    
    <section className="page">
      {error ? (
  <p className="status">{error}</p>
) : movie ? (<div className="movie-details"  style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}}>

    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>

<div className="movie-details-content">

<div className="title-row"> <h1>{movie.title}</h1>

  <button className="details-favorite-btn" onClick={handleFavorite}>
  {isFavorite ? "❤️" : "🤍"}
</button></div>
 
  <div className="movie-meta">
  <div className="meta-item">
    <span>⭐</span>
    <span>{movie.vote_average.toFixed(1)}</span>
  </div>

  <div className="meta-item">
    <span>📅</span>
    <span>{movie.release_date}</span>
  </div>

  <div className="meta-item">
    <span>🌍</span>
   <span>{movie.production_countries.map((country) => country.name).join(", ")}</span>
  </div>

  <div className="meta-item">
    <span>⏱️</span>
    <span>{movie.runtime} min</span>
  </div>
</div>

  <div className="genres">
    {movie.genres.map((genre) => (
    <span key={genre.id}>{genre.name}</span>
  ))}
  </div>

  <p>{movie.overview}</p>

  <Link
  to={`/movie/${movie.id}/trailer`}
  className="watch-trailer-btn"
>
  ▶ Watch Trailer
</Link>

</div>
  </div>
) : (
  <p className="status">Loading...</p>
)}

{movie && (
    <button className="back-btn" onClick={() => navigate(-1)}>
      ← Back
    </button>
  )}
    </section>
  );
}

export default MovieDetails;