import './App.css'
import { useState } from "react";

function App() {
// اسم کامپوننت با حروف بزرگ باید شروع شود

let appName="CineScope";
const movies =[ 
  {
  id:1,
  title: "Interstellar",
  year: 2014,
  rating: 8.65,
  poster:'/interstellar.jpg'
},
{
  id:2,
  title: "Inception",
  year: 2010,
  rating: 8.83,
  poster:'/inception.jpg'
},
{
  id:3,
  title: "The Batman",
  year: 2022,
  rating: 7.84,
  poster:'/batman.jpg'
}
];
const [search, setSearch] = useState("");

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
        {filteredMovies.length > 0 ? filteredMovies.map(movie=><MovieCard key={movie.id} movie={movie} />) : <p>No movies found</p>}
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
