const Favorite = require("../Models/Favorites");

const getFavoriteByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const favorite = await Favorite.find({ postedBy: id }).sort("-createdAt");
    res.status(200).json({ favorite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.create(req.body);
    res.status(201).json({ favorite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteFavorite = async (req, res) => {
  const { id } = req.params;
  const favorite = await Favorite.findByIdAndDelete({ _id: id });
  res.status(200).json({ status: "deleted", favorite });
};

module.exports = { getFavoriteByUser, createFavorite, deleteFavorite };
