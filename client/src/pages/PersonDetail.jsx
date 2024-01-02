import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { BsPlayFill } from "react-icons/bs";
import CircularRate from "../components/CircularRating";

const PersonDetail = ({ toggleTheme }) => {
  const location = useLocation().pathname.split("/")[2];
  const [loading, setLoading] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [personDetail, setPersonDetail] = useState([]);
  const [personCredits, setPersonCredits] = useState([]);

  const handleRead = () => {
    setReadMore(!readMore);
  };

  useEffect(() => {
    const favMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/person/${location}?api_key=80a0e202227d60da50492065dd1e2178`
        );
        const res1 = await axios.get(
          `https://api.themoviedb.org/3/person/${location}/combined_credits?api_key=80a0e202227d60da50492065dd1e2178`
        );
        setPersonDetail(res.data);
        setPersonCredits(res1.data.cast);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    favMovie();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div style={{ color: "#fff", padding: "0 20px" }}>
      <Navbar toggleTheme={toggleTheme} />
      <div className="personDetail">
        <img
          src={`https://image.tmdb.org/t/p/w500${personDetail.profile_path}`}
          alt={personDetail.name}
        />
        <div>
          <h2>
            {personDetail.name} (
            {personDetail.birthday && personDetail.birthday.split("-")[0]})
          </h2>
          {personDetail.biography ? (
            <div>
              {" "}
              <span style={{ fontSize: "0.8em" }}>
                {readMore || personDetail.biography.length < 200
                  ? personDetail.biography
                  : `${personDetail.biography.substring(0, 300)}... `}
              </span>
              {personDetail.biography.length > 200 && (
                <button className="readMore-btn" onClick={() => handleRead()}>
                  {readMore ? " _Show Less" : " _Show More"}
                </button>
              )}
            </div>
          ) : (
            <p>No BIO</p>
          )}
        </div>
      </div>

      <div className="sub-person-detail">
        <h2>MEDIAS</h2>
        <span className="underline"></span>

        <div className="movies">
          {personCredits.map((movie) => {
            const {
              poster_path,
              title,
              id,
              vote_average,
              release_date,
              media_type,
              name,
              first_air_date,
            } = movie;
            return (
              <Link to={`/${media_type}/${id}`} key={id}>
                <div className="movies-container">
                  <div className="image enlarged-image">
                    <img
                      src={
                        poster_path
                          ? `https://image.tmdb.org/t/p/w500${poster_path}`
                          : "../../public/Grey-blank-panel.png"
                      }
                      alt={title || name}
                    />
                    <div className="image-overlay movie-image-overlay">
                      <span className="image-overlay-btn">
                        <BsPlayFill size={18} />
                      </span>
                      <CircularRate value={vote_average} />
                      <div className="image-date">
                        {release_date?.split("-")[0] ||
                          first_air_date?.split("-")[0]}
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
      </div>
    </div>
  );
};

export default PersonDetail;
