const PurchaseOrdersRepositoryInMemory = require('../repositories/inMemory/PurchaseOrdersRepositoryInMemory');
const OrdersServices = require('./OrdersServices');
const AppError = require('../utils/AppError');

describe("OrdersServices", () => {
  let purchaseOrdersRepositoryInMemory;
  let ordersServices;

  beforeEach(() => {
    purchaseOrdersRepositoryInMemory = new PurchaseOrdersRepositoryInMemory();
    ordersServices = new OrdersServices(purchaseOrdersRepositoryInMemory);
  });

  it("should be able to create a new order", async() => {
    const user_id = 5;
    const itemsOrder = {
      orderItems: [
        {
          product_id: "1",
          quantity: 2,
          Unit_price: 1500
        },
        {
          product_id: "5",
          quantity: 3,
          Unit_price: 2500
        }
      ]
    };

    expect(await ordersServices.createProduct({ user_id, itemsOrder: itemsOrder.orderItems})).toBeUndefined();
  });

  it("should not be able to create a new order if the user_id is not present", async() => {
    const order = {
      orderItems: [
        {
          product_id: "1",
          quantity: 2,
          Unit_price: 1500
        },
        {
          product_id: "5",
          quantity: 3,
          Unit_price: 2500
        }
      ]
    }

    await expect(ordersServices.createProduct(order)).rejects.toEqual(new AppError("User not provided"));
  });

  it("should not be able to create a new order if there are missing data", async() => {
    const order = {
      user_id: "5",
      itemsOrder: [
        {
          product_id: "1"
        }
      ]
    }

    await expect(ordersServices.createProduct(order)).rejects.toEqual(new AppError("Provide all the data."));
  });

})