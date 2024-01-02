const express = require("express");
const reviewRouter = express.Router();
const {
  getReview,
  createReview,
  deleteReview,
  getReviewByUser,
} = require("../controllers/reviews");

reviewRouter.get("/review/:id", getReview);
reviewRouter.get("/reviews/:id", getReviewByUser);
reviewRouter.post("/review", createReview);
reviewRouter.delete("/review/:id", deleteReview);

module.exports = reviewRouter;
