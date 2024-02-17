const IngredientsRepositoryInMemory = require('./IngredientsRepositoryInMemory');

class ProductRepositoryInMemory {
  constructor() {
    this.products = [];
    this.id = Math.floor(Math.random() * 1000) + 1
  }

  async createProduct({ name, price, description, category, ingredients }) {
    const ingredientsRepositoryInMemory = new IngredientsRepositoryInMemory()

    const createdIngredients = await ingredientsRepositoryInMemory.createIngredients(ingredients);

    const product = {
      id: this.id,
      name,
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

  async findProductByFilter(filter) {
    const filteredProducts = this.products.filter(product => {
      const productNameMatches = product.title && filter.some(keyword => product.name.toLowerCase().includes(keyword.toLowerCase()));

      const productIngredientsMatch = product.createdIngredients.some(ingredient =>
        filter.some(keyword => ingredient.name.toLowerCase().includes(keyword.toLowerCase()))
      );

      return productNameMatches || productIngredientsMatch;
    });

    return filteredProducts;
  }

  async deleteProduct(id) {
    this.products = this.products.filter(product => product.id !== id);
  }

  async findProductsByIngredients(ingredients) {
  const foundProducts = this.products.filter(product => {
    return ingredients.every(ingredient => {
      return product.createdIngredients.includes(ingredient);
    });
  });

  return foundProducts;
}
}

module.exports = ProductRepositoryInMemory;