const IngredientsRepositoryInMemory = require('./IngredientsRepositoryInMemory');

class ProductRepositoryInMemory {
  constructor() {
    this.products = [];
    this.id = Math.floor(Math.random() * 1000) + 1
  }

  async createProduct({ title, price, description, category, ingredients }) {
    const ingredientsRepositoryInMemory = new IngredientsRepositoryInMemory()

    const createdIngredients = await ingredientsRepositoryInMemory.createIngredients(ingredients);

    const product = {
      id: this.id,
      title,
      price,
      description,
      category,
      createdIngredients
    }

    this.products.push(product);

    return this.products[0];
  }

  async findProductById(id) {
    const product = this.products.find(product => product.id === id);

    return product;
  }

  async deleteProduct(id) {
    this.products = this.products.filter(product => product.id !== id);
  }
}

module.exports = ProductRepositoryInMemory;