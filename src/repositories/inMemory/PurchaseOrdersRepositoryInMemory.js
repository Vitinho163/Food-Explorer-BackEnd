const ItemOrdersRepositoryInMemory = require('./ItemOrdersRepositoryInMemory');

class PurchaseOrdersRepositoryInMemory {
  constructor() {
    this.orders = [];
    this.ItemOrdersRepositoryInMemory = new ItemOrdersRepositoryInMemory();
  }

  async createProduct({ user_id, orderItems }) {
    const createItemOrder = await this.ItemOrdersRepositoryInMemory.createItemOrder({ orderItems });

    const order = {
      user_id,
      createItemOrder
    }
    this.orders.push(order);
  }
}

module.exports = PurchaseOrdersRepositoryInMemory;