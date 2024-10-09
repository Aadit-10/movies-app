import React, { FC, useState } from "react";
import "./movie-card.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LikeIcon } from "../../Icons/Like.svg";
import HeartIcon from "../../Icons/red_love.png";

interface MovieCardProps {
  id: any;
  title: string;
  language: string;
  vote_average: number;
  poster: string; // poster path without base URL (e.g., "/1E5baAaEse26fej7uHcjOgEE2t2.jpg")
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  language,
  vote_average,
  poster,
}) => {
  const [fav, setFav] = useState<any>(false);

  const navigate = useNavigate();
  const changeHeartColor = () => {
    setFav(!fav);
  };

  const baseUrl = "https://image.tmdb.org/t/p/w300";
  const fullPosterUrl = `${baseUrl}${poster}`;

  const goToMovieInfoPage = () => {
    navigate(`/movie-info-page/${id}`);
  };
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
        <div className="movie-card-text-holder">
          <div
            onClick={goToMovieInfoPage}
            className="inside-movie-card-text-holder"
          >
            {title}
          </div>
        </div>
        <div className="movie-card-language-and-like">
          <div className="movie-card-language">{language}</div>
          <div className="movie-card-like">
            <img src={HeartIcon} alt="Heart Icon " className="heart-icon" />{" "}
            {vote_average}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
