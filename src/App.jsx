// D:\js\movie_explore\cinescope\src\App.jsx
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import MovieTrailer from "./pages/MovieTrailer";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

function App() {

const appName="CineScope";
const [movies, setMovies] = useState([]);
const [genres, setGenres] = useState([]);
const [genreMovies, setGenreMovies] = useState({});
const [search, setSearch] = useState("");
const [searchResults, setSearchResults] = useState([]);
const [searchLoading, setSearchLoading] = useState(false);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem("favorites");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
});
function toggleFavorite(movie) {
  const isFavorite = favorites.some(
    (favorite) => favorite.id === movie.id
  );

  if (isFavorite) {
    setFavorites(
      favorites.filter((favorite) => favorite.id !== movie.id)
    );
  } else {
    setFavorites([...favorites, movie]);
  }
}
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
useEffect(() => {
  async function fetchMovies() {
    try {
      setLoading(true);
      setError("");

      if (search.trim()) {
  setSearchLoading(true);
}

      const url = search.trim()
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(search)}`
        : `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

const formattedMovies = data.results.map(movie => ({
  id: movie.id,
  title: movie.title,
  year: movie.release_date ? movie.release_date.split("-")[0] : "----",
  rating: movie.vote_average,
  poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  backdrop: movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  genreIds: movie.genre_ids,
}));

if (search.trim()) {
  setSearchResults(formattedMovies);
} else {
  setSearchResults([]);
  setMovies(formattedMovies);
}

    } catch (error) {
      setError("Couldn't load movies.");
    } finally {
  setLoading(false);
  setSearchLoading(false);
}
  }



  const timer = setTimeout(fetchMovies, 600);

  return () => clearTimeout(timer);

}, [search]);

  useEffect(() => {
  async function fetchGenres() {
    try {
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      setGenres(data.genres);
    } catch (error) {
      console.log(error);
    }
  }

  fetchGenres();
}, [apiKey]);

useEffect(() => {
  async function fetchGenreMovies() {
    try {
      const moviesByGenre = {};

      for (const genre of genres) {
        // یعنی روی تک‌تک ژانرهایی که TMDB به ما داده حرکت کن
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre.id}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        moviesByGenre[genre.id] = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date
            ? movie.release_date.split("-")[0]
            : "----",
          rating: movie.vote_average,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          backdrop: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
            : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          genreIds: movie.genre_ids,
        }));
      }

      setGenreMovies(moviesByGenre);

    } catch (error) {
      console.log(error);
    }
  }

  if (genres.length > 0) {
    fetchGenreMovies();
  }

}, [genres, apiKey]);

useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
  //  باید آرایه را تبدیل به متن
}, [favorites]);

  return (
    <>
    <div className="app">
      <Navbar appName={appName} />

      <Routes>
  <Route
    path="/"
    element={
      <Home
  movies={movies}
  search={search}
  setSearch={setSearch}
  loading={loading}
  error={error}
  favorites={favorites}
  toggleFavorite={toggleFavorite}
genres={genres}
genreMovies={genreMovies}
searchResults={searchResults}
searchLoading={searchLoading}
/>
    }
  />

  <Route path="/movies" element={<Movies
  movies={movies}
  loading={loading}
  error={error}
  favorites={favorites}
  toggleFavorite={toggleFavorite}
/>} />
  <Route
  path="/favorites"
  element={
    <Favorites
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  }
/>
  <Route path="/movie/:id" element={<MovieDetails favorites={favorites}  toggleFavorite={toggleFavorite}  /> }/>
  <Route
  path="/movie/:id/trailer"
  element={<MovieTrailer />}
/>
{/* :id این یعنی id یک مقدار ثابت نیست. */}
</Routes>
    </div>

    </>
  )
}

export default App
