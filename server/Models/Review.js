const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
      unique: false,
    },
    movieId: {
      type: String,
    },
    movieImage: {
      type: String,
    },
    movieName: {
      type: String,
    },
    username: {
      type: String,
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    mediaType: {
      type: String,
    },
    tvName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviews", ReviewSchema);
