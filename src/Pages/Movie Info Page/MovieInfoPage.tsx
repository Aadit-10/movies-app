import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./movie-info-page.css";

const MovieInfoPage = () => {
  const { id } = useParams();
  console.log(id);

  return <div className="movie-info-page-container"></div>;
};

export default MovieInfoPage;
