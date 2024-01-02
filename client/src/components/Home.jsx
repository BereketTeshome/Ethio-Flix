import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsPlayFill } from "react-icons/bs";
import axios from "axios";
import CircularRate from "./CircularRating";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import { MovieGenres } from "../constants";

const Home = ({ toggleTheme }) => {
  const [latestMovies, setLatestMovies] = useState({});
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const favMovie = async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=80a0e202227d60da50492065dd1e2178"
      );
      setLatestMovies([res.data.results][0][0]);
      setGenres([res.data.results][0][0].genre_ids);
    };
    favMovie();
  }, []);

  return (
    <div className="home">
      <Navbar toggleTheme={toggleTheme} />

      <div className="movie-info" key={latestMovies.id}>
        <img
          src={`https://image.tmdb.org/t/p/w500${latestMovies.poster_path}`}
          alt={latestMovies.title}
          className="home-poster"
        />{" "}
        <br />
        <div className="sub-movie-info">
          <CircularRate value={latestMovies.vote_average} />
          {genres.map((genre, index) => {
            const movieGenre = MovieGenres[genre];
            return <p key={index}>{movieGenre || genre}</p>;
          })}
        </div>
        <h1>{latestMovies.title}</h1>
        <h5>{latestMovies.overview}</h5>
        <Link to={`/movie/${latestMovies.id}`} className="watchNow-btn">
          <BsPlayFill size={20} /> WATCH NOW{" "}
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
