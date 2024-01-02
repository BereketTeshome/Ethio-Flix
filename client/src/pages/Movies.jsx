import React, { useEffect, useState } from "react";
import Home from "../components/Home";
import Cookie from "universal-cookie";
import * as jwt from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsPlayFill } from "react-icons/bs";
import CircularRate from "../components/CircularRating";
import { MdFavorite } from "react-icons/md";

const Movies = ({ toggleTheme }) => {
  const cookie = new Cookie();
  const token = cookie.get("token");
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState(true);
  const [count, setCount] = useState(1);

  const handleAdd = () => {
    setCount(count + 1);
  };
  const handleMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${
            topRated ? "discover/movie" : "movie/top_rated"
          }?api_key=80a0e202227d60da50492065dd1e2178&page=${count}`
        );
        setMovies(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [count, topRated]);

  return (
    <>
      <Home toggleTheme={toggleTheme} />
      <div className="movies-main">
        <div className="movies-header">
          <h3>Movies</h3>
          <div className="movies-btn">
            <button
              onClick={() => {
                setTopRated(!topRated);
              }}
            >
              {topRated ? "TOP RATED" : "POPULAR"}
            </button>
          </div>
        </div>

        <div className="movies">
          {movies.map((movie) => {
            const { poster_path, title, id, vote_average, release_date } =
              movie;
            return (
              <Link to={`/movie/${id}`} key={id}>
                <div className="movies-container">
                  <div className="image enlarged-image">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                      alt={title}
                    />
                    <div className="image-overlay movie-image-overlay">
                      <span className="image-overlay-btn">
                        <BsPlayFill size={18} />
                      </span>
                      <CircularRate value={vote_average} />
                      <div className="image-date">
                        {release_date ? release_date.split("-")[0] : null}
                      </div>
                      <p className="image-title">
                        {title ? title.slice(0, 53) : null}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <button className="loadMore-btn" onClick={() => handleAdd()}>
          NEXT
        </button>
        <button className="loadMore-btn" onClick={() => handleMinus()}>
          PREVIOUS
        </button>
      </div>
    </>
  );
};

export default Movies;
