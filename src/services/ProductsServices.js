const AppError = require("../utils/AppError");
const IngredientsRepository = require("../repositories/IngredientsRepository");

class ProductsServices {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async createProduct({ name, price, description, category, ingredients }) {
    
    if(!name || !price || !description || !category || !ingredients) {
      throw new AppError("all fields required!")
    }

    await this.productsRepository.createProduct({ name, price, description, category, ingredients });
  }

  async showProduct(id) {
    const product = await this.productsRepository.findProductById(id);

    if(!product) {
      throw new AppError("product not found");
    }

    return product;
  }

  async listProducts(filter) {

    const ingredientsRepository = new IngredientsRepository();

    let products;

    if(filter) {
      const splittedFilter = filter.split(",").map(item => item.trim());

      products = await this.productsRepository.findProductsByFilter(splittedFilter);
    } else {
        products = await this.productsRepository.findAllProducts();
    }

    if(!products) {
        throw new AppError("No products found!");
    }

    const productsWithIngredients = await Promise.all(products.map(async product => 
      {

        const productsIngredients = await ingredientsRepository.findIngredientsByProductId(product.id);
        const ingredients = productsIngredients.filter(ingredient => ingredient.product_id === product.id);

        return {
            ...product,
            ingredients
        };
      }));

    return productsWithIngredients;

  }

  async updateProduct({ id, name, price, description, category, ingredients}) {
    const product = await this.productsRepository.findProductById(id);

    if(!product) {
      throw new AppError("Product not found!");
    }

    if(category && category !== "food" && category !== "drink" && category !== "dessert") {
      throw new AppError("We do not support this category!");
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.category = category ?? product.category;

    const updatedProduct = {
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category
    }

    await this.productsRepository.updateProduct({
      id,
      product: updatedProduct,
      ingredients
    });

    return
  }

  async deleteProduct(id) {
    await this.productsRepository.deleteProduct(id);
  }
}

module.exports = ProductsServices;