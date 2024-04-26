const AppError = require("../utils/AppError");
const IngredientsRepository = require("../repositories/IngredientsRepository");
const DiskStorage = require("../providers/DiskStorage");

class ProductsServices {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async createProduct({ name, price, description, category, ingredients }) {
    
    if(!name || !price || !description || !category || !ingredients) {
      throw new AppError("all fields required!")
    }

    if(category !== "food" && description !== 'drink' && description !== "dessert") {
      throw new AppError("Category Invalid")
    }

    const productId = await this.productsRepository.createProduct({ name, price, description, category, ingredients });

    return productId;
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
      // Check if the filter is an ingredient filter
      if (filter.startsWith('ingredient:')) {
        const ingredientName = filter.slice('ingredient:'.length).trim();
        // find ingredient by name
        const ingredients = await ingredientsRepository.findIngredientsByName(ingredientName);
        // filter products containing the found ingredients.
        products = await this.productsRepository.findProductsByIngredients(ingredients.map(ingredient => ingredient.name))
      } else {
        // find product by name
        const splittedFilter = filter.split(",").map(item => item.trim());
  
        products = await this.productsRepository.findProductByFilter(splittedFilter);
      }
    } else {
        products = await this.productsRepository.index();
    }

    if(products.length == 0) {
        throw new AppError("No products found!");
    }

    const productsWithIngredients = await Promise.all(products.map(async product => 
      {

        const productsIngredients = await ingredientsRepository.findIngredientsByProduct(String(product.id));
        const ingredients = productsIngredients.filter(ingredient => ingredient.product_id === String(product.id));

        return {
            ...product,
            ingredients
        };
      }));

    return productsWithIngredients;

  }

  async updateProduct({ id, name, price, description, category, ingredients, image}) {
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
    product.image = image ?? product.image;

    const updatedProduct = {
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
    }

    await this.productsRepository.updateProduct({
      id,
      product: updatedProduct,
      ingredients
    });

    return
  }

  async deleteProduct(id) {
    const product = await this.productsRepository.findProductById(id);

    if(!product) {
      throw new AppError("Product not found!");
    }

    await this.productsRepository.deleteProduct(id);
  }

  async uploadImage({ product_id, image}) {
    const diskStorage = new DiskStorage();

    const product = await this.productsRepository.findProductById(product_id);

    if(!product) {
      throw new AppError("Product not found!");
    }

    if(product.image) {
      await diskStorage.deleteFile(product.image);
    }

    const filename = await diskStorage.saveFile(image);
    product.image = filename;

    await this.updateProduct({ id: product_id, image: product.image });
  }
}

module.exports = ProductsServices;