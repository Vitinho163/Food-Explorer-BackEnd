const AppError = require('../utils/AppError');
const UserRepository = require('../repositories/UserRepository');

class OrdersServices {
  constructor(purchaseOrdersRepository) {
    this.purchaseOrdersRepository = purchaseOrdersRepository;
  }

  async createProduct({ user_id, itemsOrder}) {
    if(!user_id) {
      throw new AppError("User not provided");
    }

    const orderExists = await this.purchaseOrdersRepository.listOrdersByUserId(user_id);

    itemsOrder.forEach(order => {
      if(!order.product_id || !order.quantity || !order.Unit_price) {
        throw new AppError("Provide all the data.")
      };

      if(orderExists.length !== 0) {
        const orderFound = orderExists[0].orderItems[0]
        if(orderFound.id == order.product_id && user_id == orderExists[0].user_id && orderExists[0].status == 'pending' ) {
          throw new AppError("This order already exists.")
        }
      }

    });

    await this.purchaseOrdersRepository.createProduct({ user_id, orderItems: itemsOrder });

    return
  }

  async updateOrder({ id, status, user_id }) {
    const userRepository = new UserRepository();
    const user = await userRepository.findUserById(user_id);
    if(user.isAdmin !== 1) {
      throw new AppError("You don't have permission")
    }
    
    if(!id) {
      throw new AppError("Order not specified")
    }

    const order = await this.purchaseOrdersRepository.listOrdersByUserId(id);

    if(!order) {
      throw new AppError("Order not found");
    }

    if(!status) {
      throw new AppError("Status not specified");
    }

    if(status !== "pending" && status !== "preparing" && status !== "delivered" ) {
      throw new AppError("Invalid status");
    }

    const updated = await this.purchaseOrdersRepository.updateOrder({ id, status })

    return updated;
  }

  async listAllProducts({ user_id }) {
    const userRepository = new UserRepository();

    if(!user_id) {
      throw new AppError("User ID not provided.")
    }

    const user = await userRepository.findUserById(user_id);

    if(!user) {
      throw new AppError("User not found.")
    }

    if(user.isAdmin === 1) {
      const orders = await this.purchaseOrdersRepository.listAllOrders();

      return orders;
    }

    const orders = await this.purchaseOrdersRepository.listOrdersByUserId(user_id);

    return orders;
  }

  async listOrderById({ id, user_id }) {
    const userRepository = new UserRepository();

    if(!id) {
      throw new AppError("id not provided.");
    }

    const user = await userRepository.findUserById(user_id);
    const order = await this.purchaseOrdersRepository.listOrderById(id);

    if(user.isAdmin === 0 && Number(order.user_id) !== user_id) {
      throw new AppError("You cannot view orders that do not belong to you!")
    }

    return order;
  }
}

module.exports = OrdersServices;