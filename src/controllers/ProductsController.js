const ProductsRepository = require('../repositories/ProductRepository');
const ProductsServices = require('../services/ProductsServices');
const AppError = require('../utils/AppError');

class ProductsController {
  async create(request, response) {
    const { name, price, description, category, ingredients } = request.body;

    const productsRepository = new ProductsRepository();
    const productsServices = new ProductsServices(productsRepository);
    
    const productId = await productsServices.createProduct({ name, price, description, category, ingredients });
    console.log(productId)

    response.status(201).json({
      status: "sucess",
      message: "teste",
      productId: productId
    })
  }

  // list product by filter or ID
  async index(request, response) {

    const { id } = request.params;
    let { name, ingredient } = request.query; 
  
    const productsRepository = new ProductsRepository();
    const productsServices = new ProductsServices(productsRepository);
  
    if (id) {
      const product = await productsServices.showProduct(id);
      return response.json(product);
    } else {
      let products;

      if(ingredient) {
        name = `ingredient:${ingredient}`;
      }

      products = await productsServices.listProducts(name);
      return response.json(products);
    }
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

  async uploadImage(request, response) {
    const { product_id } = request.params;

    if(!request.file) {
      throw new AppError("Image file is required.")
    }

    const fileName = request.file.filename;

    const productsRepository = new ProductsRepository();
    const productsServices = new ProductsServices(productsRepository);

    await productsServices.uploadImage({ product_id, image: fileName })

    response.status(200).json({
      status: 'sucess',
      message: 'Image sent successfully!'
    })
  }
}

module.exports = ProductsController;