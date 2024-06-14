const { Router } = require('express');
const SearchCepController = require('../controllers/SearchCepController');

const searchCepController = new SearchCepController(); 
const searchCepRoutes = Router();

searchCepRoutes.post('/', searchCepController.show);

module.exports = searchCepRoutes;