import React from 'react';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface FavoritesProps {
  movies: Movie[];
  onRemoveFavorite: (id: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ movies, onRemoveFavorite }) => {
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {movies.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <div className="favorites-list">
          {movies.map(movie => (
            <div key={movie.imdbID} className="favorite-movie">
              <img src={movie.Poster} alt={movie.Title} />
              <div>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <button onClick={() => onRemoveFavorite(movie.imdbID)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
