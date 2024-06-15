const { Router } = require('express');
const DeliveryController = require('../controllers/DeliveryController');

const deliveryController = new DeliveryController(); 
const deliveryRoutes = Router();

deliveryRoutes.post('/', deliveryController.show);
deliveryRoutes.get('/', deliveryController.get);

module.exports = deliveryRoutes;