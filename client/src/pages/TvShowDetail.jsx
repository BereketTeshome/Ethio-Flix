import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsPlayFill } from "react-icons/bs";
import axios from "axios";
import Cookie from "universal-cookie";
import * as jwt from "jwt-decode";
import Loading from "../components/Loading";
import CircularRate from "../components/CircularRating";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Youtube from "react-player/youtube";
import Navbar from "../components/Navbar";
import { IoMdSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Favorite from "../components/Favorite";

const TvShowDetail = ({ toggleTheme }) => {
  const cookie = new Cookie();
  const token = cookie.get("token");
  const [tvDetail, setTvDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation().pathname.split("/")[2];
  const [genres, setGenres] = useState([]);
  const [casts, setCasts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const username = token && jwt.jwtDecode(token).username;
  const userId = token && jwt.jwtDecode(token).userId;
  const [review, setReview] = useState("");
  const movieImage = `https://image.tmdb.org/t/p/w500${tvDetail?.poster_path}`;
  const movieId = useLocation().pathname.split("/")[2];
  const postedBy = token && jwt.jwtDecode(token).userId;
  const [reviewInfo, setReviewInfo] = useState();
  const movieName = tvDetail?.title;
  const tvName = tvDetail?.name;
  const mediaType = useLocation().pathname.split("/")[1];

  useEffect(() => {
    try {
      const fetchReview = async () => {
        const res = await axios.get(
          `https://ethio-flix-server.vercel.app/api/review/${movieId}`
        );
        setReviewInfo(res.data.review);
      };
      fetchReview();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRemove = async (_id) => {
    await axios.delete(
      `https://ethio-flix-server.vercel.app/api/review/${_id}`
    );
    window.location.reload();
  };

  const handlePost = async () => {
    try {
      !token &&
        setTimeout(() => {
          toast.error("MUST LOGIN FIRST!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }, 1);

      token &&
        (await axios.post("https://ethio-flix-server.vercel.app/api/review", {
          review,
          movieId,
          movieImage,
          movieName,
          username,
          postedBy,
          mediaType,
          tvName,
        }));
      token && window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const favMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${location}?api_key=80a0e202227d60da50492065dd1e2178`
        );
        const res2 = await axios.get(
          `https://api.themoviedb.org/3/tv/${location}/credits?api_key=80a0e202227d60da50492065dd1e2178`
        );
        const res3 = await axios.get(
          `https://api.themoviedb.org/3/tv/${location}/videos?api_key=80a0e202227d60da50492065dd1e2178`
        );
        const res4 = await axios.get(
          `https://api.themoviedb.org/3/tv/${location}/images?api_key=80a0e202227d60da50492065dd1e2178`
        );
        const res5 = await axios.get(
          "https://api.themoviedb.org/3/tv/popular?api_key=80a0e202227d60da50492065dd1e2178"
        );
        setTvDetail(res.data);
        setGenres(res.data.genres);
        setCasts(res2.data.cast);
        setVideos(res3.data.results);
        setBackdrops(res4.data.backdrops);
        setPosters(res4.data.posters);
        setPopularTv(res5.data.results);
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
    <div className="tvDetail">
      <Navbar toggleTheme={toggleTheme} />

      <div className="sub-movie-details">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${tvDetail.poster_path}`}
            alt={tvDetail.title}
          />
        </div>
        <div className="movie-details-right">
          <h1>{tvDetail.original_name}</h1>

          <div className="sub-movie-info">
            <CircularRate value={tvDetail.vote_average} />
            {genres.map((genre) => {
              return <p key={genre.id}>{genre.name}</p>;
            })}
          </div>

          <p className="detail-overview">{tvDetail.overview}</p>

          <div className="sub-movie-info-btn">
            <a href="#youtube-slide" className="watchNow-btn">
              <BsPlayFill size={20} /> WATCH NOW
            </a>
            <button className="fav-btn">
              <Favorite movieDetail={tvDetail} />
            </button>
          </div>

          <div>
            <h2 className="cast-text">CAST</h2>
            <span className="underline"></span>

            <div className="casts-container">
              {casts.map((cast) => {
                return (
                  <Link to={`/person/${cast.id}`} className="cast-name">
                    <div key={cast.id}>
                      <img
                        src={
                          cast.profile_path
                            ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                            : "../../public/unknown.jpg"
                        }
                        alt={cast.name}
                      />
                      <p>{cast.name.slice(0, 15)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="detail-video">
        <h2 id="youtube-slide">VIDEOS</h2>
        <span className="underline"></span>

        <Swiper
          className="swiper-navigation"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log()}
          onSlideChange={() => console.log()}
          style={{
            "--swiper-navigation-color": "silver",
            "--swiper-pagination-color": "#fff",
          }}
        >
          {videos.slice(0, 4).map((item) => {
            const { id, key } = item;
            return (
              <SwiperSlide key={id}>
                {loading ? (
                  <Loading />
                ) : (
                  <Youtube
                    url={`http://youtu.be/${key}`}
                    width={"100%"}
                    height={"550px"}
                    controls={true}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="backdrops">
        <h2>BACKDROPS</h2>
        <span className="underline"></span>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={2}
          navigation
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log()}
          onSlideChange={() => console.log()}
        >
          {backdrops.slice(0, 8).map((backdrop) => {
            const { file_path } = backdrop;
            return (
              <SwiperSlide key={file_path}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${file_path}`}
                  className="backdrop-img"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div>
        <h2>POSTERS</h2>
        <span className="underline"></span>
        <div className="poster-container">
          <div className="posters">
            {posters.slice(0, 11).map((backdrop) => {
              const { file_path } = backdrop;
              return (
                <img
                  src={
                    file_path
                      ? `https://image.tmdb.org/t/p/w500${file_path}`
                      : "../../public/Grey-blank-panel.png"
                  }
                  className="poster-img"
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ///////////// Review Section /////////////// */}

      <div>
        <h2>REVIEWS({reviewInfo?.length})</h2>
        <span className="underline"></span>
        <div>
          {reviewInfo?.map((info) => {
            const { username, createdAt, review, _id, postedBy } = info;
            let dateObj = new Date(createdAt);
            let month = dateObj.getMonth() + 1;
            let date = dateObj.getDate();
            let year = dateObj.getFullYear();
            return (
              <div className="user-review-container">
                <div className="sub-user-review-container">
                  <div>
                    <button className="user-btn review-btn">
                      {username?.slice(0, 1)}
                    </button>
                  </div>
                  <div className="review-info">
                    <h4>{username}</h4>
                    <p>
                      {date}-{month}-{year}
                    </p>
                    <h3>{review}</h3>
                  </div>
                </div>
                {postedBy == userId && (
                  <button
                    className="review-container-button"
                    onClick={() => handleRemove(_id)}
                  >
                    <MdDelete size={20} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <hr className="hr" />

        <div className="review-container">
          <div className="sub-review-container">
            {username && (
              <button className="user-btn review-btn">
                {username && username.slice(0, 1)}
              </button>
            )}
            <h3>{username}</h3>
          </div>
          <div className="review-textarea">
            <textarea
              rows={5}
              placeholder={
                reviewInfo?.length < 1
                  ? "Be the first to Write a review"
                  : "Write your review"
              }
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button
              className="review-container-button"
              onClick={() => handlePost()}
              disabled={!review}
            >
              <IoMdSend color="white" size={20} className="send-btn" /> POST
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2>YOU MAY ALSO LIKE</h2>
        <span className="underline"></span>
        <div className="pop-movies-container">
          {popularTv.map((movie) => {
            const { poster_path, id, first_air_date, vote_average, name } =
              movie;
            return (
              <a href={`/tv/${id}`}>
                <div key={id} className="image">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={name}
                  />
                  <div className="image-overlay">
                    <CircularRate value={vote_average} />
                    <div className="image-date">
                      {first_air_date ? first_air_date.split("-")[0] : null}
                    </div>
                    <p className="image-title">
                      {name ? name.slice(0, 18) : null}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TvShowDetail;
