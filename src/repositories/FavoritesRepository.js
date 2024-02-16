const knex = require('../database/knex');

class FavoritesRepository {
  async createFavorite({ user_id, product_id }) {
      const favorite = await knex('favorites').insert({ user_id, product_id });

      return favorite;
  }

  async deleteFavorite(id) {
    await knex("favorites").where({ id }).del()
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