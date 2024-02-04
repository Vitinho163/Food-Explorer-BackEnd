const { Router } = require("express");

const usersRouter = require("./users.routes");
const productsRoutes = require("./products.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/products", productsRoutes);

module.exports = routes;