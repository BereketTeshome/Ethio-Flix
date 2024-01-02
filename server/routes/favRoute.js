const express = require("express");
const favoriteRouter = express.Router();
const {
  createFavorite,
  deleteFavorite,
  getFavoriteByUser,
} = require("../controllers/favorites");

favoriteRouter.get("/favorites/:id", getFavoriteByUser);
favoriteRouter.post("/favorite", createFavorite);
favoriteRouter.delete("/favorite/:id", deleteFavorite);

module.exports = favoriteRouter;
