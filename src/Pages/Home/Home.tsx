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
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [apiPage, setApiPage] = useState<any>(1);
  useEffect(() => {
    getGenreDetails();
    getMovieDetails(1);
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

  // Getting all details of movies
  const getMovieDetails = async (page: any = "", genreId: string = "") => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: page,
        sort_by: "popularity.desc",
        with_genres: genreId,
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

    allMovies.forEach((movie: any) => {
      if (genreId === "") {
        // If no genreId is provided, store all movies
        setNeededMovieDetails((prevDetails) => [
          ...prevDetails,
          {
            id: movie?.id || "",
            title: movie?.title || "",
            original_language: movie?.original_language || "",
            vote_average: movie?.vote_average || "",
            poster_path: movie?.poster_path || "",

            backdrop_path: movie?.backdrop_path || "",
            genre_ids: movie?.genre_ids || [],
            // genre_ids: [28, 35, 878],
            overview: movie?.overview || "",
            popularity: movie?.popularity || "",
            release_date: movie?.release_date || "",
            video: movie?.video || "",
            vote_count: movie?.vote_count || "",
          },
        ]);
      } else {
        // If genreId is provided, filter the movies by genreId
        if (movie.genre_ids.includes(Number(genreId))) {
          setNeededMovieDetails((prevDetails) => [
            ...prevDetails,
            {
              id: movie?.id || "",
              title: movie?.title || "",
              original_language: movie?.original_language || "",
              vote_average: movie?.vote_average || "",
              poster_path: movie?.poster_path || "",

              backdrop_path: movie?.backdrop_path || "",
              genre_ids: movie?.genre_ids || [],
              overview: movie?.overview || "",
              popularity: movie?.popularity || "",
              release_date: movie?.release_date || "",
              video: movie?.video || "",
              vote_count: movie?.vote_count || "",
            },
          ]);
        }
      }
    });
  };

  const pagination = (noOfItemsPerPage: any, data: any) => {
    const stopIndex = noOfItemsPerPage * currentPage;
    const startIndex = stopIndex - noOfItemsPerPage;
    return data.slice(startIndex, stopIndex);
  };

  const dataToShow = pagination(4, neededMovieDetails);
  const totalPages = Math.ceil(neededMovieDetails.length / 4);
  // console.log("neededMovieDetails", neededMovieDetails);
  // console.log("activeButton", activeButton);
  console.log("Genres", allGenres);

  const handleNextPage = () => {
    if (activeButton == "All") {
      if (currentPage < totalPages) {
        setCurrentPage((prevPage: any) => prevPage + 1);
      } else if (currentPage === totalPages) {
        setApiPage((prevPage: number) => prevPage + 1);
        getMovieDetails(apiPage + 1);
        setCurrentPage(1);
      }
    } else {
      if (currentPage < totalPages) {
        setCurrentPage((prevPage: any) => prevPage + 1);
      } else if (currentPage === totalPages) {
        setApiPage((prevPage: number) => prevPage + 1);
        const genreId = genreIdFinder(activeButton);
        getMovieDetails(apiPage + 1, genreId);
        setCurrentPage(1);
      }
    }
  };
  const handlePreviousPage = () => {
    if (activeButton == "All") {
      if (currentPage > 1) {
        setCurrentPage((prevPage: number) => prevPage - 1);
      } else if (currentPage === 1 && apiPage !== 1) {
        setApiPage((prevPage: number) => prevPage - 1);
        getMovieDetails(apiPage - 1);
        setCurrentPage(5);
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage((prevPage: number) => prevPage - 1);
      } else if (currentPage === 1 && apiPage !== 1) {
        setApiPage((prevPage: number) => prevPage - 1);
        const genreId = genreIdFinder(activeButton);
        getMovieDetails(apiPage - 1, genreId);
        setCurrentPage(5);
      }
    }
  };

  const genreIdFinder = (genreName: string) => {
    const matchedGenre = allGenres.find(
      (genre: any) => genre.name === genreName
    );
    return matchedGenre ? matchedGenre.id : undefined;
  };
  // const genreId = genreIdFinder(activeButton);
  // console.log("genreId", genreId);

  // const handleNextPage = () => {
  //   if (activeButton == "All") {
  //     if (currentPage < totalPages) {
  //       setCurrentPage((prevPage: any) => prevPage + 1);
  //     } else if (currentPage === totalPages) {
  //       setApiPage((prevPage: number) => prevPage + 1);
  //       getMovieDetails(apiPage + 1);
  //       setCurrentPage(1);
  //     }
  //   } else {
  //     const genreid = genreIdFinder(activeButton);
  //     if (currentPage < totalPages) {
  //       setCurrentPage((prevPage: any) => prevPage + 1);
  //     } else if (currentPage === totalPages) {
  //       setApiPage((prevPage: number) => prevPage + 1);
  //       getMovieDetails(apiPage + 1, genreid);
  //       setCurrentPage(1);
  //     }
  //   }
  // };
  // const handlePreviousPage = () => {
  //   if (activeButton == "All") {
  //     if (currentPage > 1) {
  //       setCurrentPage((prevPage: number) => prevPage - 1);
  //     } else if (currentPage === 1 && apiPage !== 1) {
  //       setApiPage((prevPage: number) => prevPage - 1);
  //       getMovieDetails(apiPage - 1);
  //       setCurrentPage(5);
  //     }
  //   } else {
  //     const genreid = genreIdFinder(activeButton);
  //     if (currentPage > 1) {
  //       setCurrentPage((prevPage: number) => prevPage - 1);
  //     } else if (currentPage === 1 && apiPage !== 1) {
  //       setApiPage((prevPage: number) => prevPage - 1);
  //       getMovieDetails(apiPage - 1, genreid);
  //       setCurrentPage(5);
  //     }
  //   }
  // };

  return (
    <div className="home-container">
      <div className="home">
        <div className="now-show-and-view-all">
          <p> Now Showing </p>
          <p
            className="view-all-text"
            onClick={() => {
              settingMovieCardDetails();
              setActiveButton("All");
            }}
          >
            View all
          </p>
        </div>

        <div className="button-group">
          <ButtonComponent
            text={"All"}
            genreId={""}
            settingMovieCardDetails={settingMovieCardDetails}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            setCurrentPage={setCurrentPage}
            // getMovieDetails={getMovieDetails}
          />

          {allGenres.map((genre: any) => (
            <ButtonComponent
              text={genre.name}
              genreId={genre.id}
              settingMovieCardDetails={settingMovieCardDetails}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              setCurrentPage={setCurrentPage}
              // getMovieDetails={getMovieDetails}
            />
          ))}
        </div>
        <div className="movie-card-group-container">
          {dataToShow.length === 0 ? (
            <div className="no-movie-message">
              No Movie/Show found in this Genre
            </div>
          ) : (
            <div className="movie-card-group">
              <span
                className={`material-symbols-outlined ${
                  currentPage === 1 && apiPage === 1 ? "disabled" : ""
                }`}
                onClick={handlePreviousPage}
              >
                arrow_back
              </span>

              {dataToShow.map((movie: any) => (
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  original_language={movie.original_language}
                  vote_average={movie.vote_average}
                  poster_path={movie.poster_path}
                />
              ))}

              <span
                className={`material-symbols-outlined ${
                  currentPage === totalPages && allMovies.length === 0
                    ? "disabled"
                    : ""
                }`}
                onClick={handleNextPage}
              >
                arrow_forward
              </span>
            </div>
          )}

          {/* {allMovies.map((movie: any) => console.log("helelo"))} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
