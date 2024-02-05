const { Router } = require("express");

const usersRouter = require("./users.routes");
const productsRoutes = require("./products.routes");
const favoritesRoutes = require("./favorites.routes");
const ordersRoutes = require("./orders.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/products", productsRoutes);
routes.use("/favorites", favoritesRoutes);
routes.use("/orders", ordersRoutes);

module.exports = routes;