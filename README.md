# CineScope

CineScope is a responsive movie discovery web application built with React. It allows users to explore trending and genre-based movies, search for movies, view detailed information, watch trailers, and save favorite movies.

Movie data is provided by the TMDB API.

## Features

* Browse trending movies
* Explore movies by genre
* Search for movies with live search results
* View movie details
* Watch movie trailers
* Add and remove movies from favorites
* Persist favorites using Local Storage
* Responsive navigation with a mobile menu
* Responsive movie cards and horizontal movie rows
* Loading and error states
* Responsive design for desktop and mobile devices

## Screenshots
* HOME.PNG
* HOME_MOVIES.PNG
* Movie_Details.PNG
* Favorites.PNG

## Technologies

* React
* JavaScript
* React Router
* Vite
* CSS
* TMDB API
* Local Storage
* Git & GitHub

## Project Structure

```text
src/
├── components/
│   ├── MovieCard.jsx
│   ├── MovieRow.jsx
│   ├── MovieSlider.jsx
│   ├── Navbar.jsx
│   └── SearchDropdown.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Movies.jsx
│   ├── Favorites.jsx
│   ├── MovieDetails.jsx
│   └── MovieTrailer.jsx
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/FatemehZakeri-Z/cinescope.git
```

### 2. Navigate to the project

```bash
cd cinescope
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the TMDB API

Create a `.env.local` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Replace `your_tmdb_api_key` with your own TMDB API key.

### 5. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## API

CineScope uses the [TMDB API](https://developer.themoviedb.org/) to retrieve movie information, genres, images, and trailers.

An API key is required to run the application locally.

## Data Persistence

Favorite movies are stored in the browser's Local Storage, allowing favorites to remain available after refreshing the page.

## Responsive Design

CineScope is designed to work across different screen sizes, including desktop, tablet, and mobile devices.

The navigation changes to a mobile menu on smaller screens, while movie sections remain horizontally scrollable for easier browsing.

## Purpose

This project was built as a portfolio project to practice and demonstrate React development, JavaScript, API integration, routing, state management, responsive UI development, and working with browser storage.

## License

This project is intended for educational and portfolio purposes.
