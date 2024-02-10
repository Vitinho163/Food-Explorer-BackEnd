const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const IngredientsRepository = require('./IngredientsRepository');

class ProductRepository {
  async createProduct({ name, price, description, category, ingredients }) {
    const ingredientsRepository = new IngredientsRepository();

    const formattedPrice = price.replace(",", ".");
    const parsedPrice = parseFloat(formattedPrice);
    const priceInCents = parsedPrice * 100;

    const [product] = await knex("products").insert({
      name,
      price:priceInCents,
      description,
      category
    }).returning("id");

    await ingredientsRepository.createIngredient({ ingredients, product_id: product.id})
  }

  async findProductById(id) {
    const ingredientsRepository = new IngredientsRepository();

    const productId = await knex("products").where({ id }).first();

    if(!productId) {
      throw new AppError("product not found!");
    }

    const ingredients = await ingredientsRepository.findIngredientsByProduct(id);

    if(ingredients) {
      const product = {
        ...productId,
        ingredients
      }

      return product
    } else {
      return productId
    }
  }

  async findProductByFilter(filter) {
    const ingredientsRepository = new IngredientsRepository();

    const [filteredProducts] = await Promise.all(filter.map(async product => {
      const products = await knex("products").whereLike("name", `%${product}%`).orderBy("name");

      return products;
    }))

    const filteredIngredients = await ingredientsRepository.findIngredientsByFilter(filter);

    return [...filteredProducts, ...filteredIngredients];
  }

  async index() {
    const products = await knex("products").orderBy("created_at");

    return products;
  }

  async updateProduct({ id, product, ingredients }) {
    const ingredientsRepository = new IngredientsRepository();

    let priceInCents = product.price;

    if(typeof product.price !== "number") {
      const formattedPrice = product.price.replace(",", ".");
      const parsedPrice = parseFloat(formattedPrice);
      priceInCents = parsedPrice * 100;
    }

    await knex("products")
      .where({ id})
      .update({
        name: product.name,
        price: priceInCents,
        description: product.description,
        category: product.category,
        image: product.image,
        updated_at: knex.fn.now()
      });

      if(ingredients) {
        await ingredientsRepository.updateIngredients({ ingredients, product_id: id});
      }

      return;
  }

  async deleteProduct(id) {
    const ingredientsRepository = new IngredientsRepository();
  
    await ingredientsRepository.deleteIngredientsByIdProduct({ id });
    await knex("products").where({ id }).del();

    return;
  }


}

module.exports = ProductRepository;