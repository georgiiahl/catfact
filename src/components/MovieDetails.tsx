import React from 'react';

interface MovieDetailsProps {
  movie: any;
  onBack: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onBack }) => {
  return (
    <div className="movie-details">
      <button onClick={onBack}>Back</button>
      <h2>{movie.Title}</h2>
      <p>{movie.Plot}</p>
      <p>Director: {movie.Director}</p>
      <p>Actors: {movie.Actors}</p>
      <p>Released: {movie.Released}</p>
      <p>Genre: {movie.Genre}</p>
      <p>IMDB Rating: {movie.imdbRating}</p>
      <img src={movie.Poster} alt={movie.Title} />
    </div>
  );
};

export default MovieDetails;
