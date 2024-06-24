import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList, { Movie } from './components/MovieList';
import SearchBar from './components/SearchBar';
import './App.css';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favourites';
import { openDB } from 'idb';

const App: React.FC = () => {
  const YOUR_API_KEY = '53d32310';
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      const db = await openDB('MovieDB', 1, {
        upgrade(db) {
          db.createObjectStore('favorites', { keyPath: 'imdbID' });
        },
      });
      const allFavorites = await db.getAll('favorites');
      setFavorites(allFavorites);
    };
    loadFavorites();
  }, []);

  const saveFavorites = async (newFavorites: Movie[]) => {
    const db = await openDB('MovieDB', 1);
    const tx = db.transaction('favorites', 'readwrite');
    await Promise.all(newFavorites.map(fav => tx.store.put(fav)));
    await tx.done;
  };

  const searchMovies = (query: string) => {
    setError(null);
    axios.get(`https://www.omdbapi.com/?apikey=${YOUR_API_KEY}&s=${query}`)
      .then(response => {
        if (response.data.Error) {
          setError(response.data.Error);
          setMovies([]);
        } else if (response.data.Search) {
          setMovies(response.data.Search);
        }
      })
      .catch(error => setError('Network error. Please try again.'));
  };

  const fetchMovieDetails = (id: string) => {
    axios.get(`https://www.omdbapi.com/?apikey=${YOUR_API_KEY}&i=${id}`)
      .then(response => {
        setSelectedMovie(response.data);
      })
      .catch(error => setError('Error fetching movie details.'));
  };

  const addFavorite = (movie: Movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const removeFavorite = async (id: string) => {
    const newFavorites = favorites.filter(movie => movie.imdbID !== id);
    setFavorites(newFavorites);

    const db = await openDB('MovieDB', 1);
    const tx = db.transaction('favorites', 'readwrite');
    await tx.store.delete(id); // Удаление из IndexedDB
    await tx.done;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Search</h1>
        <SearchBar onSearch={searchMovies} />
      </header>
      <main>
        {error && <div className="error">{error}</div>}
        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
        ) : (
          <>
            <MovieList movies={movies} onMovieSelect={fetchMovieDetails} onAddFavorite={addFavorite} />
            <Favorites movies={favorites} onRemoveFavorite={removeFavorite} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
