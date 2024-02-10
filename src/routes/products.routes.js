const Router = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');

const ProductsController = require('../controllers/ProductsController');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const productsController = new ProductsController();
const productsRoutes = Router();

const upload = multer(uploadConfig.MULTER);

productsRoutes.use(ensureAuthenticated);

productsRoutes.get("/:id?", productsController.index);

productsRoutes.post("/", verifyUserAuthorization, productsController.create);
productsRoutes.put("/image/:product_id", verifyUserAuthorization, upload.single("image"), productsController.uploadImage)
productsRoutes.put("/:id", verifyUserAuthorization, productsController.update);
productsRoutes.delete("/:id", verifyUserAuthorization, productsController.delete)

module.exports = productsRoutes;