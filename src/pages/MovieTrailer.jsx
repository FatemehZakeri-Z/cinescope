import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function MovieTrailer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTrailer() {
      try {
        setLoading(true);
        setError("");

        const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        const officialTrailer = data.results.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official === true
        );

        setTrailer(officialTrailer || null);

      } catch (error) {
        console.log(error);
        setError("Couldn't load the trailer.");
      } finally {
        setLoading(false);
      }
    }

    fetchTrailer();
  }, [id]);

  return (
    <section className="trailer-page">

      {loading ? (
        <p className="status">Loading trailer...</p>
      ) : error ? (
        <p className="status">{error}</p>
      ) : trailer ? (
        <>
          <div className="trailer-header">
            <button
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>

            {/* <h1>Movie Trailer</h1> */}
          </div>

          <div className="trailer-container">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </>
      ) : (
        <p className="status">Trailer not found.</p>
      )}

    </section>
  );
}

export default MovieTrailer;