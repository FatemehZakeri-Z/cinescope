// D:\js\movie_explore\cinescope\src\components\MovieSlider.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MovieSlider({ movies }) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const movie = movies[currentIndex];

  function nextSlide() {
    setCurrentIndex((currentIndex + 1) % movies.length);
  }

  function previousSlide() {
    setCurrentIndex(
      (currentIndex - 1 + movies.length) % movies.length
    );
  }

  useEffect(() => {
  if (movies.length === 0) return;

  const timer = setInterval(() => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % movies.length);
  }, 6000);

  return () => clearInterval(timer);
}, [movies.length]);

  return (
    <section className="movie-slider">

      {movie && (
        <div
         key={movie.id}
          className="slider-background"
          style={{
            backgroundImage: `url(${movie.backdrop})`
          }}
        >

          <div className="slider-overlay"></div>

          <div className="slider-content">

            <span className="slider-label">
              FEATURED MOVIE
            </span>

            <h1>{movie.title}</h1>

            <div className="slider-meta">
              <span>{movie.year}</span>
              <span>⭐ {movie.rating.toFixed(1)}</span>
            </div>

            <Link to={`/movie/${movie.id}`} className="slider-details-btn">
              View Details
            </Link>

          </div>

          <button
            className="slider-btn slider-prev"
            onClick={previousSlide}
          >
            ←
          </button>

          

          <button
            className="slider-btn slider-next"
            onClick={nextSlide}
          >
            →
          </button>

          <div className="slider-indicators">
  {movies.map((movie, index) => (
    <button
      key={movie.id}
      className={index === currentIndex ? "active" : ""}
      onClick={() => setCurrentIndex(index)}
    >
    </button>
  ))}
</div>

        </div>
      )}

    </section>
  );
}

export default MovieSlider;