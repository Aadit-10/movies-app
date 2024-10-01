import React, { FC } from "react";
import "./movie-card.css";

const MovieCard: React.FC<any> = ({ title, language, vote, poster }) => {
  interface MovieCardProps {
    title: string;
    language: string;
    vote: number;
    poster: string; // poster path without base URL (e.g., "/1E5baAaEse26fej7uHcjOgEE2t2.jpg")
  }

  const baseUrl = "https://image.tmdb.org/t/p/w300";
  const fullPosterUrl = `${baseUrl}${poster}`;
  return (
    <div className="movie-card-container">
      <div className="movie-card-holder">
        <div className="movie-card-image">
          <img src={fullPosterUrl} alt={title} />
        </div>
        <div className="movie-card-text">{title}</div>
        <div className="movie-card-language-and-like">
          <div className="movie-card-language">{language}</div>
          <div className="movie-card-like">{vote}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
