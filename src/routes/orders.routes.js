const Router = require('express');
const OrdersController = require('../controllers/OrdersController');

const ordersController = new OrdersController();
const ordersRoutes = Router();

ordersRoutes.get("/", ordersController.index);
ordersRoutes.get("/:id", ordersController.show),
ordersRoutes.post("/:user_id", ordersController.create);
ordersRoutes.patch("/:id", ordersController.update);

module.exports = ordersRoutes;