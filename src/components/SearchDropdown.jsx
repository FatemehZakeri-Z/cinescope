import { Link } from "react-router-dom";

function SearchDropdown({ searchResults, search, searchLoading }) {

  if (!search.trim()) {
    return null;
  }

  return (
    <div className="search-dropdown">

      {searchLoading ? (
  <p>Loading...</p>
) : searchResults.length > 0 ? (
        searchResults.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            className="search-result"
            key={movie.id}
          >
            <img src={movie.poster} alt={movie.title} />

            <div className="search-result-info">
              <h3>{movie.title}</h3>
              <span>{movie.year}</span>
            </div>
          </Link>
        ))
      ) : (
        <p>No movies found.</p>
      )}

    </div>
  );
}

export default SearchDropdown;