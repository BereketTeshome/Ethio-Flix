import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import CircularRate from "./CircularRating";
import { BsPlayFill } from "react-icons/bs";

const Section = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const favMovie = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=80a0e202227d60da50492065dd1e2178"
      );
      setPopularMovies(res.data.results);

      const res1 = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?api_key=80a0e202227d60da50492065dd1e2178"
      );
      setPopularSeries(res1.data.results);

      const res2 = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=80a0e202227d60da50492065dd1e2178"
      );
      setTopRatedMovies(res2.data.results);

      const res3 = await axios.get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=80a0e202227d60da50492065dd1e2178"
      );
      setTopRatedSeries(res3.data.results);

      setLoading(false);
    };
    favMovie();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="section">
      <div className="pop-movies">
        <h3>POPULAR MOVIES</h3>
        <span className="underline"></span>

        <div className="pop-movies-container">
          {popularMovies.map((movie) => {
            const { poster_path, title, id, release_date, vote_average } =
              movie;
            return (
              <Link to={`/movie/${id}`} key={id}>
                <div key={id} className="image">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                  />
                  <div className="image-overlay">
                    <span className="image-overlay-btn">
                      <BsPlayFill size={18} />
                    </span>
                    <CircularRate value={vote_average} />
                    <div className="image-date">
                      {release_date ? release_date.split("-")[0] : null}
                    </div>
                    <p className="image-title">
                      {title ? title.slice(0, 18) : null}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pop-movies">
        <h3>POPULAR SERIES</h3>
        <span className="underline"></span>

        <div className="pop-movies-container">
          {popularSeries.map((movie) => {
            const { poster_path, id, name, first_air_date, vote_average } =
              movie;
            return (
              <Link to={`/tv/${id}`} key={id}>
                <div key={id} className="image">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={name}
                  />
                  <div className="image-overlay">
                    <span className="image-overlay-btn">
                      <BsPlayFill size={18} />
                    </span>
                    <CircularRate value={vote_average} />
                    <div className="image-date">
                      {first_air_date ? first_air_date.split("-")[0] : null}
                    </div>
                    <p className="image-title">
                      {name ? name.slice(0, 18) : null}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pop-movies">
        <h3>TOP RATED MOVIES</h3>
        <span className="underline"></span>

        <div className="pop-movies-container">
          {topRatedMovies.map((movie) => {
            const { poster_path, title, id, release_date, vote_average } =
              movie;
            return (
              <Link to={`/movie/${id}`} key={id}>
                <div className="image">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                  />
                  <div className="image-overlay">
                    <span className="image-overlay-btn">
                      <BsPlayFill size={18} />
                    </span>
                    <CircularRate value={vote_average} />
                    <div className="image-date">
                      {release_date ? release_date.split("-")[0] : null}
                    </div>
                    <p className="image-title">
                      {title ? title.slice(0, 18) : null}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pop-movies">
        <h3>TOP RATED SERIES</h3>
        <span className="underline"></span>

        <div className="pop-movies-container">
          {topRatedSeries.map((movie) => {
            const {
              poster_path,
              title,
              id,
              first_air_date,
              name,
              vote_average,
            } = movie;
            return (
              <Link to={`/tv/${id}`} key={id}>
                <div className="image">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                  />
                  <div className="image-overlay">
                    <span className="image-overlay-btn">
                      <BsPlayFill size={18} />
                    </span>
                    <CircularRate value={vote_average} />
                    <div className="image-date">
                      {first_air_date ? first_air_date.split("-")[0] : null}
                    </div>
                    <p className="image-title">
                      {name ? name.slice(0, 18) : null}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Section;
