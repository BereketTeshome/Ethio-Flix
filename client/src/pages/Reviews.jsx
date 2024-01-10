import Navbar from "../components/Navbar";
import Cookie from "universal-cookie";
import * as jwt from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";

const Reviews = ({ toggleTheme }) => {
  const cookie = new Cookie();
  const token = cookie.get("token");
  const userId = token && jwt.jwtDecode(token).userId;
  const [reviewsInfo, setReviewsInfo] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchReviews = async () => {
        setLoading(true);
        const res = await axios.get(
          `https://ethio-flix-server.vercel.app/api/reviews/${userId}`
        );
        setReviewsInfo(res.data.review);
        setLoading(false);
      };
      fetchReviews();
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar toggleTheme={toggleTheme} />
      <div className="review-page-container">
        <h2>YOUR REVIEWS ({reviewsInfo?.length})</h2>
        <span className="underline"></span>

        {reviewsInfo?.length <= 0 && <NotFound />}
        <div>
          {reviewsInfo?.map((info) => {
            const {
              createdAt,
              review,
              _id,
              movieImage,
              movieName,
              movieId,
              mediaType,
              tvName,
            } = info;
            let dateObj = new Date(createdAt);
            let month = dateObj.getMonth() + 1;
            let date = dateObj.getDate();
            let year = dateObj.getFullYear();

            return (
              <div key={_id} className="reviews">
                <div className="sub-reviews">
                  <img
                    className="reviews-img"
                    src={movieImage}
                    alt={movieName || tvName}
                  />
                  <div>
                    <h2>
                      <a
                        className="reviews-link"
                        href={`/${mediaType}/${movieId}`}
                      >
                        {movieName || tvName}
                      </a>
                    </h2>
                    <p>
                      {date}-{month}-{year}
                    </p>
                    <h4>
                      <i>" {review} "</i>{" "}
                    </h4>
                  </div>
                </div>
                <button
                  className="review-container-button"
                  onClick={() => handleRemove(_id)}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
