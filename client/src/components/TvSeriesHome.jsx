import React, { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import axios from "axios";
import Loading from "./Loading";
import CircularRate from "./CircularRating";
import Navbar from "./Navbar";
import { TvGenres } from "../constants";
import { Link } from "react-router-dom";

const TvSeriesHome = ({ toggleTheme }) => {
  const [latestMovies, setLatestMovies] = useState({});
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const favMovie = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?api_key=80a0e202227d60da50492065dd1e2178"
      );
      setLatestMovies([res.data.results][0][0]);
      setGenres([res.data.results][0][0].genre_ids);
      setLoading(false);
    };
    favMovie();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home tv-home">
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
            const tvGenre = TvGenres[genre];
            return <p key={index}>{tvGenre || genre}</p>;
          })}
        </div>
        <h1>{latestMovies.original_name}</h1>
        <h5>{latestMovies.overview}</h5>
        <Link to={`/tv/${latestMovies.id}`} className="watchNow-btn">
          <BsPlayFill size={20} /> WATCH NOW{" "}
        </Link>
      </div>
    </div>
  );
};

export default TvSeriesHome;
