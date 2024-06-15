const AppError = require("../utils/AppError");
require('dotenv').config();

class DeliveryController {
  async get(request, response) {
    const { origin, destination } = request.query;
    const apiKey = process.env.GOOGLE_KEY;

    try {
      const directionsResponse = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving&key=${apiKey}`);

      if (!directionsResponse.ok) {
        throw new AppError('Erro ao obter as informações')
      }

      const directionsData = await directionsResponse.json();

      response.json({
        distance: directionsData.routes[0].legs[0].distance.text,
        duration: directionsData.routes[0].legs[0].duration.text,
        directions: directionsData
      });

    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async show(request, response) {
    const { cep } = request.body;

    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.erro) {
          throw new AppError("Cep não localizado", 404);
        }
        const address = data;

        return response.json({
          logradouro: address.logradouro,
          bairro: address.bairro,
          localidade: address.localidade,
          uf: address.uf,
          cep: address.cep,
        });
      })
      .catch((error) => {
        throw new AppError(error.message, error.statusCode);
      });
  }
}

module.exports = DeliveryController