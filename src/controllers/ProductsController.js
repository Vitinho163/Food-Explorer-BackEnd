const ProductsRepository = require('../repositories/ProductRepository');
const ProductsServices = require('../services/ProductsServices');

class ProductsController {
  async create(request, response) {
    const { name, price, description, category, ingredients } = request.body;

    const productsRepository = new ProductsRepository();
    const productsServices = new ProductsServices(productsRepository);
    
    await productsServices.createProduct({ name, price, description, category, ingredients });

    response.status(201).json({
      status: "sucess",
      message: "successfully created product"
    })
  }

  // list product by id
  async show(request, response) {
    const { id } = request.params;

    const productsRepository = new ProductsRepository();
    const productsServices = new ProductsServices(productsRepository);

    const product = await productsServices.showProduct(id);

    return response.json(product)
  }

  // list product by filter
  async index(request, response) {
    const { filter } = request.query;

    const productsRepository = new ProductsRepository();
    const productsServices = new ProductsServices(productsRepository);

    const products = await productsServices.listProducts(filter);

    return response.json(products);
  }

  async update(request, response) {
    const { name, price, description, category, ingredients } = request.body;
    const { id } = request.params;

    const productsRepository = new ProductsRepository();
    const productsServices = new ProductsServices(productsRepository);

    await productsServices.updateProduct({ id, name, price, description, category, ingredients});

    return response.status(200).json({
      status: "sucess",
      message: "Product updated successfully!"
    })
  }

  async delete(request, response) {
    const { id} = request.params;

    const productsRepository = new ProductsRepository();
    const productsServices = new ProductsServices(productsRepository);

    await productsServices.deleteProduct(id);

    return response.status(200).json({
      status: 'sucess',
      message: "Product deleted successfully!"
    })
  }
}

module.exports = ProductsController;