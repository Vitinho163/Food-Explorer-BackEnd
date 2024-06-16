const knex = require('../database/knex');
const ItemOrdersRepository = require('./ItemOrdersRepository');
const AddressOrdersRepository = require('./AddressOrdersRepository');

class PurchaseOrdersRepository {
  async createProduct({ user_id, orderItems, addressOrder, shippingValue }) {
    const itemOrdersRepository = new ItemOrdersRepository();
    const addressOrdersRepository = new AddressOrdersRepository();

    const [order] = await knex("orders").insert({
      user_id,
      shipping_value: shippingValue
    }).returning('id');

    await itemOrdersRepository.createItemOrder({ order_id: order.id, orderItems });
    await addressOrdersRepository.createAddressOrder({ order_id: order.id, addressOrder })

    return
  }

  async updateOrder({ id, status }) {
    await knex("orders").where({ id }).update({ status})

    return
  }

  async listAllOrders() {
    const itemOrdersRepository = new ItemOrdersRepository();

    const orders = await knex("orders").select("*").orderBy("created_at", "desc");

    let ordersWithItems = [];

    for(let i = 0; i < orders.length; i++) {
      const orderItems = await itemOrdersRepository.listOrderItemsByOrderId(orders[i].id);
      ordersWithItems = [...ordersWithItems, {...orders[i], orderItems}];
    }

    return ordersWithItems;
  }

  async listOrdersByUserId(user_id) {
    const itemOrdersRepository = new ItemOrdersRepository();

    const orders = await knex("orders").where({user_id}).select("*").orderBy("created_at", "desc");
    let ordersWithItems = [];

    for(let i = 0; i < orders.length; i++) {
      const orderItems = await itemOrdersRepository.listOrderItemsByOrderId(orders[i].id);
      ordersWithItems = [...ordersWithItems, {...orders[i], orderItems}];
    }

    return ordersWithItems;
  }

  async listOrderById(id) {
    const listOrdersRepository = new ItemOrdersRepository();

    const order = await knex("orders").where({ id}).first();

    const orderItems = await listOrdersRepository.listOrderItemsByOrderId(id);

    const orderWithItems = {...order, orderItems};

    return orderWithItems;
  }
}

module.exports = PurchaseOrdersRepository;