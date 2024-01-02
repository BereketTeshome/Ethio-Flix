const Review = require("../Models/Review");

const getReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.find({ movieId: id });
    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviewByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.find({ postedBy: id }).sort("-createdAt");
    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete({ _id: id });
  res.status(200).json({ status: "deleted", review });
};

module.exports = { getReview, getReviewByUser, createReview, deleteReview };
