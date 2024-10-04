import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.css";
import ButtonComponent from "../../Components/ButtonComponent/ButtonComponent";
import MovieCard from "../../Components/MovieCard/MovieCard";

const Home: React.FC = () => {
  // let allGenres: any = [];
  const [activeButton, setActiveButton] = useState<any>("All");
  const [allGenres, setAllGenres] = useState<any>([]);
  const [allMovies, setAllMovies] = useState<any>([]);
  const [neededMovieDetails, setNeededMovieDetails] = useState<any[]>([]);

  useEffect(() => {
    getGenreDetails();
    getMovieDetails();
  }, []);

  useEffect(() => {
    settingMovieCardDetails();
  }, [allMovies]);

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
      // return allGenres;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  console.log("allGenres", allGenres);

  // Getting all details of movies
  const getMovieDetails = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: "1",
        sort_by: "popularity.desc",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzQwNzhjOTk0MDQ0YjdjNzI4MGM0YTc1NWMzYzBlZSIsIm5iZiI6MTcyNzQzMjYwNS43NjcxMzYsInN1YiI6IjY2ZjY3OThlYjlmZDI3NjI3OTUwYWUxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-d0UJGj5fnFCE5XaNyuPSZ9v5s0sBJFLIw62nVbVZ9U",
      },
    };
    try {
      const response = await axios.request(options);
      console.log(response.data.results);
      setAllMovies(response.data.results);
      return allMovies;
    } catch (error) {
      console.error(error);
    }
  };

  // Getting the essential details for showing in movie card
  const settingMovieCardDetails = (genreId = "") => {
    // Clear the previous movie details before adding new ones
    setNeededMovieDetails([]);

    let matchingMoviesFound = false; // Flag to check if any movie matches the genreId

    allMovies.forEach((movie: any) => {
      if (genreId === "") {
        // If no genreId is provided, store all movies
        setNeededMovieDetails((prevDetails) => [
          ...prevDetails,
          {
            title: movie?.title || "",
            language: movie?.original_language || "",
            vote: movie?.vote_average || "",
            poster: movie?.poster_path || "",
          },
        ]);
      } else {
        // If genreId is provided, filter the movies by genreId
        if (movie.genre_ids.includes(Number(genreId))) {
          matchingMoviesFound = true; // Set flag to true if any movie matches

          setNeededMovieDetails((prevDetails) => [
            ...prevDetails,
            {
              title: movie?.title || "",
              language: movie?.original_language || "",
              vote: movie?.vote_average || "",
              poster: movie?.poster_path || "",
            },
          ]);
        }
      }
    });

    // If no matching movies are found, log a message
    if (genreId !== "" && !matchingMoviesFound) {
      console.log("No movie satisfies the condition for the given genre ID.");
    }
  };

  const displayMovies = neededMovieDetails.slice(0, 10);

  // console.log("neededMovieDetails", neededMovieDetails);

  return (
    <div className="home-container">
      <div className="home">
        <div className="now-show-and-view-all">
          <p> Now Showing </p>
          <p> View all</p>
        </div>

        <div className="button-group">
          <ButtonComponent
            text={"All"}
            genreId={""}
            settingMovieCardDetails={settingMovieCardDetails}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          {allGenres.map((genre: any) => (
            <ButtonComponent
              text={genre.name}
              genreId={genre.id}
              settingMovieCardDetails={settingMovieCardDetails}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          ))}
        </div>
        <div className="movie-card-group-container">
          <div className="movie-card-group">
            <span className="material-symbols-outlined">arrow_back</span>
            {neededMovieDetails.map((movie: any) => (
              <MovieCard
                title={movie.title}
                language={movie.language}
                vote={movie.vote}
                poster={movie.poster}
              />
            ))}
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
          {/* {allMovies.map((movie: any) => console.log("helelo"))} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
