const AppError = require("../utils/AppError");

class UsersController {
  async show(request, response) {
    const { cep } = request.body;

    // Importação dinâmica de node-fetch
    const fetch = (await import("node-fetch")).default;

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

module.exports = UsersController