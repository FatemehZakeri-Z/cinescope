import './App.css'
import MovieCard from "./components/MovieCard";
import { useState, useEffect } from "react";

function App() {
// اسم کامپوننت با حروف بزرگ باید شروع شود
const appName="CineScope";
const [movies, setMovies] = useState([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
useEffect(() => {
  async function fetchMovies() {
    try {
      setLoading(true);
      setError("");

      const url = search.trim()
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(search)}`
        : `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      setMovies(
        data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ? movie.release_date.split("-")[0] : "----",
          rating: movie.vote_average,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }))
      );
    } catch (error) {
      setError("Couldn't load movies.");
    } finally {
      setLoading(false);
    }
  }

  const timer = setTimeout(fetchMovies, 600);

  return () => clearTimeout(timer);

}, [search]);

  return (
    <>
    <div className='app'>
      {/* <h1 className='appName'>{appName}</h1> */}
      <section className='hero'>
        <h1 className='text_h1'>Discover your next favorite movie!</h1>
        <p className="hero-subtitle">Search thousands of movies and discover your next favorite.</p>
        <input name='search' type='search' className='search' value={search} onChange={(event) =>setSearch(event.target.value)} placeholder='What Do You Want To Watch?'/>

      </section>
      <div className='cards'>
        {loading ? (<p className="status">Loading movies...</p>) : error ? (<p className="status">{error}</p>) : movies.length > 0 ? (movies.map(movie => (<MovieCard key={movie.id} movie={movie}/>))) : (<p className="status">No movies found.</p>)}
     </div>
    </div>

    </>
  )
}

export default App
