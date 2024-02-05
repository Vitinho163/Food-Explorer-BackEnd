const AppError = require("../utils/AppError");

class FavoritesServices {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository;
  }

  async addFavorite({ user_id, product_id }) {

    //Check if you provided the user ID and product ID.
    if(!user_id || !product_id) {
      throw new AppError("Error while favoriting the product. Please provide the user ID and product ID.")
    }

    const favoriteExists = await this.favoritesRepository.findFavoriteByProductId({ product_id });

    if(favoriteExists) {
      throw new AppError("This product is already in the favorites list!");
    }

    const favorite = await this.favoritesRepository.createFavorite({ user_id, product_id });

    return favorite;

  }

  async deleteFavorite(id) {
    if(!id) {
      throw new AppError("Provide the product ID in the favorites list.")
    }

    await this.favoritesRepository.deleteFavorite(id);

    return;
  }

  async listFavorites(user_id) {
    if(!user_id) {
      throw new AppError("Please provide the user ID.")
    }

    const favorites = await this.favoritesRepository.listFavorites(user_id);

    return favorites;
  }
}

module.exports = FavoritesServices