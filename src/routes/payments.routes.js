const { Router } = require('express');
const PaymentsController = require('../controllers/PaymentsController');

const paymentsController = new PaymentsController(); 
const paymentsRoutes = Router();

paymentsRoutes.post('/', paymentsController.create);
paymentsRoutes.get('/:id', paymentsController.checkPaymentStatus);

module.exports = paymentsRoutes;