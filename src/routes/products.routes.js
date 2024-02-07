const Router = require('express');
const ProductsController = require('../controllers/ProductsController');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const productsController = new ProductsController();
const productsRoutes = Router();

productsRoutes.use(ensureAuthenticated);

productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.show);

productsRoutes.post('/', verifyUserAuthorization, productsController.create);
productsRoutes.put("/:id", verifyUserAuthorization, productsController.update);
productsRoutes.delete("/:id", verifyUserAuthorization, productsController.delete)

module.exports = productsRoutes;