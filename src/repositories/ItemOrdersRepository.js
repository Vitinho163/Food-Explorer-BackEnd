const knex = require('../database/knex');

class ItemOrdersRepository {
  async createItemOrder({ order_id, orderItems }) {
    orderItems.forEach(async order => {
      let parsedQuantity = order.quantity;
      let unitPrice = order.Unit_price;

      if(typeof order.quantity !== "number") {
        parsedQuantity = parseInt(order.quantity);
      }

      if(typeof order.Unit_price !== "number") {
        const formattedPrice = order.Unit_price.replace(",", ".");
        const parsedPrice = parseFloat(formattedPrice);
        unitPrice = parsedPrice * 100;
      }

      const totalPrice = parsedQuantity * unitPrice;

      await knex("order_items").insert({
        order_id,
        product_id: order.product_id,
        quantity: parsedQuantity,
        Unit_price: unitPrice,
        total_price: totalPrice
      });


    });

    return
  }

  async listOrderItemsByOrderId(order_id) {
    const orderItems = await knex("order_items")
      .select([
        "products.id",
        "products.name",
        "products.price",
        "order_items.quantity",
        "products.image"
      ])
      .where({order_id})
      .innerJoin("products", "products.id", "order_items.product_id");

    return orderItems;
  }
}

module.exports = ItemOrdersRepository;