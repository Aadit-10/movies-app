import React, { FC, useState } from "react";
import "./movie-card.css";
import { ReactComponent as LikeIcon } from "../../Icons/Like.svg";
import HeartIcon from "../../Icons/red_love.png";

const MovieCard: React.FC<any> = ({ title, language, vote, poster }) => {
  const [fav, setFav] = useState<any>(false);
  interface MovieCardProps {
    title: string;
    language: string;
    vote: number;
    poster: string; // poster path without base URL (e.g., "/1E5baAaEse26fej7uHcjOgEE2t2.jpg")
  }
  const changeHeartColor = () => {
    setFav(!fav);
  };

  const baseUrl = "https://image.tmdb.org/t/p/w300";
  const fullPosterUrl = `${baseUrl}${poster}`;

  return (
    <div className="movie-card-container">
      <div className="movie-card-holder">
        <div className="movie-card-image">
          <img src={fullPosterUrl} alt={title} />

          <LikeIcon
            className={`movie-card-heart ${fav && "fav-active"}`}
            onClick={changeHeartColor}
          />
        </div>
        <div className="movie-card-text">{title}</div>
        <div className="movie-card-language-and-like">
          <div className="movie-card-language">{language}</div>
          <div className="movie-card-like">
            <img src={HeartIcon} alt="Heart Icon " className="heart-icon" />{" "}
            {vote}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
