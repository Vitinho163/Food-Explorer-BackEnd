class ItemOrdersRepositoryInMemory {
  constructor() {
    this.itemsOrder = [];
    this.order_id = Math.floor(Math.random() * 1000) + 1
  }

  async createItemOrder({ orderItems }) {
    const items = await Promise.all(orderItems.map(async order => {

      const totalPrice = order.quantity * order.Unit_price;
      const orderItem = {
        order_id: this.order_id,
        product_id: order.product_id,
        quantity: order.quantity,
        Unit_price: order.Unit_price,
        total_price: totalPrice
      };

      return orderItem;
    }));

    this.itemsOrder.push(items);

    return items;
  }
}

module.exports = ItemOrdersRepositoryInMemory;