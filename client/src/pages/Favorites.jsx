import Navbar from "../components/Navbar";
import Cookie from "universal-cookie";
import * as jwt from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";

const Favorites = ({ toggleTheme }) => {
  const cookie = new Cookie();
  const token = cookie.get("token");
  const userId = token && jwt.jwtDecode(token).userId;
  const [favoritesInfo, setFavoritesInfo] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchFavorites = async () => {
        setLoading(true);
        const res = await axios.get(
          `https://ethio-flix-server.vercel.app/api/favorites/${userId}`
        );
        setFavoritesInfo(res.data.favorite);
        setLoading(false);
      };
      fetchFavorites();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFavRemove = async (_id) => {
    await axios.delete(
      `https://ethio-flix-server.vercel.app/api/favorite/${_id}`
    );
    window.location.reload();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar toggleTheme={toggleTheme} />
      <div className="favorite-page-container">
        <h2>YOUR FAVORITES ({favoritesInfo?.length})</h2>
        <span className="underline"></span>

        {favoritesInfo?.length <= 0 && <NotFound />}
        <div className="favorites">
          {favoritesInfo?.map((info) => {
            const { _id, movieImage, movieId, mediaType } = info;
            return (
              <div key={_id} className="sub-favorites">
                <a href={`/${mediaType}/${movieId}`} className="reviews-link">
                  <img src={movieImage} alt={movieId} />
                </a>

                <button
                  className="review-container-button fav-del-btn"
                  onClick={() => handleFavRemove(_id)}
                >
                  <MdDelete size={20} />
                  REMOVE
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
