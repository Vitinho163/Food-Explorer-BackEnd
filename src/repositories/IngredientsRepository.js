const knex = require('../database/knex');

class IngredientsRepository {
  async createIngredient({ ingredients, product_id}) {
    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        product_id,
        name: ingredient
      }
    });

    await knex("ingredients").insert(ingredientsInsert);
  };

  async findIngredientsByProduct(product_id) {
    const ingredients = await knex("ingredients").where({ product_id });

    return ingredients;
  }

  async findIngredientsByFilter(filter) {
    try {
      const ingredients = await knex("ingredients").select([
        "products.id",
        "products.name",
        "products.price",
        "products.description",
        "products.category",
        "products.image"
      ])
      .whereIn("products.name", filter)
      .innerJoin("products", "products.id", "ingredients.product_id")
      .groupBy("products.id")
      .orderBy("products.name");

      return ingredients;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async updateIngredients({ ingredients, product_id }) {
    // delete ingredient
    await knex("ingredients").where({ product_id }).del();

    // create ingredient
    await this.createIngredient({ ingredients, product_id });

    return;
  }

  async deleteIngredientsByIdProduct({ id }) {
    await knex("ingredients").where({ product_id: id }).del();
    return;
  }
};

module.exports = IngredientsRepository;