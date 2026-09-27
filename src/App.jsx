import './App.css'
import { useState, useEffect } from "react";

function App() {
// اسم کامپوننت با حروف بزرگ باید شروع شود
const appName="CineScope";
const [movies, setMovies] = useState([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
// useState داده را نگه می‌دارد
// useEffect کارهایی را انجام می‌دهد که باید بعد از Render اتفاق بیفتند؛ مثل گرفتن اطلاعات از اینترنت
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
useEffect(() => {

  const timer = setTimeout(() => {
  fetchMovies();
}, 600);
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

      // console.log(data);

      setMovies(
        data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date
            ? movie.release_date.split("-")[0]
            : "----",
          rating: movie.vote_average,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }))
      );
    } catch (error) {

         setError("Couldn't load movies.");

      } finally {

       setLoading(false);

      }
      //  فاینلی همیشه اجرا میشه
  }
  return () => clearTimeout(timer);

  fetchMovies();
}, [search]);

const filteredMovies=movies.filter(movie =>
   movie.title.toLowerCase().includes(search.toLowerCase())
   
);
  return (
    <>
    <div className='app'>
      {/* <h1 className='appName'>{appName}</h1> */}
      <section className='hero'>
        <h1 className='text_h1'>Discover your next favorite movie!</h1>
        <p className="hero-subtitle">
  Search thousands of movies and discover your next favorite.
</p>
        <input name='search' type='search' className='search' value={search} onChange={(event) =>setSearch(event.target.value)} placeholder='What Do You Want To Watch?'/>

      </section>
      <div className='cards'>
        {loading ? (
        <p className="status">Loading movies...</p>
        ) : error ? (
        <p className="status">{error}</p>
        ) : filteredMovies.length > 0 ? (
        filteredMovies.map(movie => (
       <MovieCard key={movie.id} movie={movie}/>
       ))
       ) : (
       <p className="status">No movies found.</p>
       )}
     </div>
    </div>

    </>
  )
}
function MovieCard({ movie }) {
  // Destructuring یعنی const movie = props.movie
 return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title}  />
      <h3>{movie.title.toUpperCase()}</h3>
      <div className="movie-info">
        <span>{movie.year}</span>
        <span>⭐{movie.rating.toFixed(1)}</span>
      </div>
      
    </div>
    
  )
}

export default App
