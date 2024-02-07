const FavoritesRepository = require('../repositories/FavoritesRepository');
const FavoritesServices = require('../services/FavoritesServices');

class FavoritesController {
  async create(request, response) {
    const { product_id } = request.body;
    const user_id = request.user.id;

    const favoritesRepository = new FavoritesRepository();
    const favoritesServices = new FavoritesServices(favoritesRepository);

    await favoritesServices.addFavorite({ user_id, product_id });

    return response.status(201).json({
      status: "sucess",
      message: "Product successfully added to the favorites list!"
    })
  }

  async delete(request, response ) {
    const { id } = request.params;

    const favoritesRepository = new FavoritesRepository;
    const favoritesServices = new FavoritesServices(favoritesRepository);

    await favoritesServices.deleteFavorite(id);

    return response.json({
      status: "sucess",
      message: "Successfully removed product from favorites!"
    })
  }

  async index(request, response) {
    const user_id = request.user.id;

    const favoritesRepository = new FavoritesRepository();
    const favoritesServices = new FavoritesServices(favoritesRepository);

    const favorites = await favoritesServices.listFavorites(user_id);
    return response.json(favorites);
  }

}

module.exports = FavoritesController;