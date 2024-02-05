const AppError = require('../utils/AppError');
const UserRepository = require('../repositories/UserRepository');

class OrdersServices {
  constructor(purchaseOrdersRepository) {
    this.purchaseOrdersRepository = purchaseOrdersRepository;
  }

  async createProduct({ user_id, orderItems}) {
    if(!user_id) {
      throw new AppError("User not provided");
    }

    orderItems.forEach(order => {
      if(!order.product_id || !order.quantity || !order.Unit_price) {
        throw new AppError("Provide all the data.")
      };

    });

    await this.purchaseOrdersRepository.createProduct({ user_id, orderItems });

    return
  }

  async updateOrder({ id, status }) {
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

  async listOrderById({ id }) {
    if(!id) {
      throw new AppError("id not provided.");
    }

    const order = await this.purchaseOrdersRepository.listOrderById(id);

    return order;
  }
}

module.exports = OrdersServices;