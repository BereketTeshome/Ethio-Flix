import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import TvSeriesHome from "../components/TvSeriesHome";
import { Link } from "react-router-dom";
import { BsPlayFill } from "react-icons/bs";
import CircularRate from "../components/CircularRating";

const TvSeries = ({ toggleTheme }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/${
            topRated ? "discover/tv" : "tv/top_rated"
          }?api_key=80a0e202227d60da50492065dd1e2178&page=${count}`
        );
        setMovies(res.data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [count, topRated]);

  return (
    <>
      <TvSeriesHome toggleTheme={toggleTheme} />
      <div className="movies-main">
        <div className="movies-header">
          <h3>TV Shows</h3>
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
            const { poster_path, name, id, vote_average, first_air_date } =
              movie;
            return (
              <Link to={`/tv/${id}`} key={id}>
                <div className="movies-container">
                  <div className="image enlarged-image">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                      alt={name}
                    />
                    <div className="image-overlay movie-image-overlay">
                      <span className="image-overlay-btn">
                        <BsPlayFill size={18} />
                      </span>
                      <CircularRate value={vote_average} />
                      <div className="image-date">
                        {first_air_date ? first_air_date.split("-")[0] : null}
                      </div>
                      <p className="image-title">
                        {name ? name.slice(0, 53) : null}
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

export default TvSeries;
