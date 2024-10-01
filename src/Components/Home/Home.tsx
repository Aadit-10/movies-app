import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const Home: React.FC = () => {
  // let allGenres: any = [];
  const [allGenres, setAllGenres] = useState<any>([]);
  useEffect(() => {
    getGenreDetails();
  }, []);
  const getGenreDetails = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list",
      params: { language: "en" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzQwNzhjOTk0MDQ0YjdjNzI4MGM0YTc1NWMzYzBlZSIsIm5iZiI6MTcyNzQzMjYwNS43NjcxMzYsInN1YiI6IjY2ZjY3OThlYjlmZDI3NjI3OTUwYWUxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-d0UJGj5fnFCE5XaNyuPSZ9v5s0sBJFLIw62nVbVZ9U",
      },
    };

    try {
      const response = await axios.request(options);
      const Genres = response.data.genres;
      setAllGenres(Genres);
      // console.log("Inside Fn", allGenres);
      return allGenres;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const genre: string[] = [
    "All",
    "Adventure",
    "Action",
    "History",
    "Racing",
    "Horror",
  ];
  return (
    <div className="home-container">
      <div className="home">
        <div className="now-show-and-view-all">
          <p> Now Showing </p>
          <p> View all</p>
        </div>

        <div className="button-group">
          {allGenres.map((genre: any) => (
            <ButtonComponent text={genre.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
