const mongoose = require("mongoose");

const FavSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
    },
    movieImage: {
      type: String,
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    mediaType: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("favorites", FavSchema);
