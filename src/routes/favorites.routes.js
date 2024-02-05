const Router = require("express");

const FavoritesController = require("../controllers/FavoritesController");

const favoritesController = new FavoritesController();

const favoritesRoutes = Router();

favoritesRoutes.get("/:user_id", favoritesController.index);
favoritesRoutes.post("/", favoritesController.create);
favoritesRoutes.delete("/:id", favoritesController.delete);

module.exports = favoritesRoutes;
