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

  async listOrdersByUserId(user_id) {
    const orders = this.orders.filter(order => order.user_id === user_id);
    const ordersWithItems = [];

    for (const order of orders) {
      const orderItems = await this.itemOrdersRepository.listOrderItemsByOrderId(order.id);
      ordersWithItems.push({ ...order, orderItems });
    }

    return ordersWithItems;
  }

  async listOrderById(id) {
    const order = this.orders.find(order => order.id === id);
    if (!order) {
      return null;
    }

    // Obtemos os itens do pedido usando o repositório de itens em memória
    const orderItems = await this.itemOrdersRepository.listOrderItemsByOrderId(id);

    // Retornamos a ordem com os itens
    return { ...order, orderItems };
  }
  
}

module.exports = PurchaseOrdersRepositoryInMemory;