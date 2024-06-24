import React from 'react';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieListProps {
  movies: Movie[];
  onMovieSelect: (id: string) => void;
  onAddFavorite: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieSelect, onAddFavorite }) => {
  return (
    <div className="movie-list">
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        movies.map(movie => (
          <div key={movie.imdbID} className="movie" onClick={() => onMovieSelect(movie.imdbID)}>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <button onClick={(e) => { e.stopPropagation(); onAddFavorite(movie); }}>Add to Favorites</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieList;
