const { Router } = require("express");

const usersRouter = require("./users.routes");
const productsRoutes = require("./products.routes");
const favoritesRoutes = require("./favorites.routes");
const ordersRoutes = require("./orders.routes");
const sessionsRouter = require('./sessions.routes');
const delivery = require('./delivery.routes');
const paymentsRoutes = require("./payments.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/products", productsRoutes);
routes.use("/favorites", favoritesRoutes);
routes.use("/orders", ordersRoutes);
routes.use('/sessions', sessionsRouter);
routes.use('/delivery', delivery);
routes.use('/payments', paymentsRoutes);

module.exports = routes;