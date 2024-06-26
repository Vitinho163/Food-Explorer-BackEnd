const { Router } = require('express');
const PaymentsController = require('../controllers/PaymentsController');

const paymentsController = new PaymentsController(); 
const paymentsRoutes = Router();

paymentsRoutes.post('/', paymentsController.create);

module.exports = paymentsRoutes;