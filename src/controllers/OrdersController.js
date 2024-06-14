const OrdersServices = require('../services/OrdersServices');
const PurchaseOrdersRepository = require('../repositories/PurchaseOrdersRepository');

class OrdersController {
  async create(request,response) {
    const user_id = request.user.id;
    const { orderItems, address } = request.body;

    const purchaseOrdersRepository = new PurchaseOrdersRepository();
    const ordersServices = new OrdersServices(purchaseOrdersRepository);

    await ordersServices.createProduct({ user_id, itemsOrder: orderItems, addressOrder: address });

    return response.status(201).json({
      status: "sucess",
      message: "Order created successfully"
    });
  }

  async update(request, response) {
    const user_id = request.user.id;
    const { id } = request.params;
    const { status } = request.body;

    const purchaseOrdersRepository = new PurchaseOrdersRepository();
    const ordersServices = new OrdersServices(purchaseOrdersRepository);

    await ordersServices.updateOrder({ id, status, user_id });

    return response.status(200).json({
      status: "Sucess",
      message: "Order successfully updated"
    })
  }

  async index(request, response) {
    const user_id = request.user.id;

    const purchaseOrdersRepository = new PurchaseOrdersRepository();
    const ordersServices = new OrdersServices(purchaseOrdersRepository);

    const orders = await ordersServices.listAllProducts({ user_id });

    let message;
    if(orders.length === 0) {
      message = "There are no orders."
    } else {
      message = orders
    }

    return response.status(200).json({
      status: "sucess",
      message
    })
  }

  async show(request, response) {
    const user_id = request.user.id;
    const { id } = request.params;

    const purchaseOrdersRepository = new PurchaseOrdersRepository();
    const ordersServices = new OrdersServices(purchaseOrdersRepository);

    const order = await ordersServices.listOrderById({ id, user_id}) 

    return response.status(200).json({
      status: "sucess",
      order
    })
  }
}

module.exports = OrdersController;