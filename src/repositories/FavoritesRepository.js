const ProductsRepository = require('../repositories/ProductRepository');
const ProductsServices = require('../services/ProductsServices');
const knex = require('../database/knex');

class FavoritesRepository {
  async createFavorite({ user_id, product_id }) {
      const favorite = await knex('favorites').insert({ user_id, product_id });

      const productsRepository = new ProductsRepository();
      const productsServices = new ProductsServices(productsRepository);
      const product = await productsServices.showProduct(product_id);

      if(!product) {
        throw new AppError("Product not found!")
      }

      return favorite;
  }

  async deleteFavorite(id) {
    try {
      await knex("favorites").where({ product_id: id}).del()
    } catch (error) {
      throw new AppError("This favorite does not exist");
    }
  }

  async listFavorites(user_id) {
    const userFavorites = await knex("favorites").select([
      "products.id",
      "products.name",
      "products.image"
    ])
    .where({ user_id })
    .innerJoin("products", "products.id", "favorites.product_id")
    .orderBy("user_id");

    return userFavorites;
  }

  async findFavoriteByProductId({ product_id }) {
    const favorite = await knex("favorites").where({ product_id }).first();

    return favorite;
  }

  async findFavoriteByID(id) {
    const favorite = await knex("favorites").where({ id: id });

    return favorite;
  }
}

module.exports = FavoritesRepository;