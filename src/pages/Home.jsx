// D:\js\movie_explore\cinescope\src\pages\Home.jsx
import MovieSlider from "../components/MovieSlider";
import MovieRow from "../components/MovieRow";
import SearchDropdown from "../components/SearchDropdown";
import { useRef, useEffect } from "react";

function Home({
  movies,
  search,
  setSearch,
  favorites,
  toggleFavorite,
  genres,
  genreMovies,
  searchResults,
  searchLoading
}) {
const searchRef = useRef(null);
useEffect(() => {
  function handleClickOutside(event) {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setSearch("");
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [setSearch]);
  return (
    <>
    <MovieSlider movies={movies} />
      <section className="search-section" ref={searchRef}>
  <input
    type="search"
    className="search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search for a movie..."
  />
  <SearchDropdown
  searchResults={searchResults}
  search={search}
  searchLoading={searchLoading}
/>
</section>

      <MovieRow
  title="Trending Movies"
  movies={movies}
  favorites={favorites}
  toggleFavorite={toggleFavorite}
/>

{genres.map((genre) => (
  <MovieRow
    key={genre.id}
    title={genre.name}
    movies={genreMovies[genre.id] || []}
    favorites={favorites}
    toggleFavorite={toggleFavorite}
  />
))}

    </>
  );
}

export default Home;