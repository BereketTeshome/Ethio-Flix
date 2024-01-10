import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookie from "universal-cookie";
import * as jwt from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const Favorite = ({ movieDetail }) => {
  const cookie = new Cookie();
  const token = cookie.get("token");
  const [fav, setFav] = useState(false);
  const movieImage = `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`;
  const movieId = useLocation().pathname.split("/")[2];
  const userId = token && jwt.jwtDecode(token).userId;
  const postedBy = token && jwt.jwtDecode(token).userId;
  const mediaType = useLocation().pathname.split("/")[1];
  const [favoritesInfo, setFavoritesInfo] = useState([]);
  const compareMovieId = useLocation().pathname.split("/")[2];
  const liked = favoritesInfo?.map((info) => info.movieId);

  useEffect(() => {
    try {
      const fetchFavorites = async () => {
        const res = await axios.get(
          `https://ethio-flix-server.vercel.app/api/favorites/${userId}`
        );
        setFavoritesInfo(res.data.favorite);
        liked.includes(compareMovieId) && setFav(true);
      };
      fetchFavorites();
    } catch (error) {
      console.log(error);
    }
  }, [liked]);

  const handleDislike = async () => {
    setTimeout(() => {
      toast.info("GO TO FAVORITES PAGE TO DISLIKE", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          width: "340px",
          position: "relative",
          right: "90px",
        },
      });
    }, 1);
  };

  const handleFav = async () => {
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

      token && setFav((prev) => !prev);
      await axios.post("https://ethio-flix-server.vercel.app/api/favorite", {
        movieId,
        movieImage,
        postedBy,
        mediaType,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {fav && (
        <MdFavorite
          size={25}
          className="fav-btn"
          onClick={() => handleDislike()}
        />
      )}
      {!fav && (
        <MdFavoriteBorder
          size={25}
          className="fav-btn"
          onClick={() => handleFav()}
        />
      )}
    </div>
  );
};

export default Favorite;
