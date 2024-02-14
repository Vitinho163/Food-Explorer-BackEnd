const ProductRepositoryInMemory = require('../repositories/inMemory/ProductRepositoryInMemory');
const ProductsServices = require('./ProductsServices');
const AppError = require('../utils/AppError');

describe('ProductsServices', () => {
  let productRepositoryInMemory;
  let productsServices;

  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    productsServices = new ProductsServices(productRepositoryInMemory);
  });

  it("should be able to create a new product", async() => {
    const product = {
      name: "Salada Ravanello",
      price: "25,00",
      description: "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.",
      category: "food",
      ingredients: ["alface", "cebola", "pão naan"]
    }

    const productCreated = await productsServices.createProduct(product);

    expect(productCreated).toHaveProperty("id");
  });

  it("should not be able to create a new product with an invalid category", async() => {
    const product = {
      name: "Tranquil Essence Mist",
      price: "14,99",
      description: "Refreshing blend of citrus, lavender, and peppermint essential oils.",
      category: "Home",
      ingredients: ["Water", "citrus oil blend", "lavender oil"]
    }

    await expect(productsServices.createProduct(product)).rejects.toEqual(new AppError("Category Invalid"));
  });

  it("should be able to delete a product", async() => {
    const product = {
      name: "Salada Ravanello",
      price: "25,00",
      description: "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.",
      category: "food",
      ingredients: ["alface", "cebola", "pão naan"]
    }

    const productCreated = await productsServices.createProduct(product);

    await productsServices.deleteProduct(productCreated.id);

    const productFound = await productRepositoryInMemory.findProductById(productCreated.id);

    expect(productFound).toBeUndefined();
  });
});