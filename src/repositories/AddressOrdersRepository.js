const knex = require('../database/knex');

class AddressOrdersRepository {
  async createAddressOrder({ order_id, addressOrder }) {
      await knex("order_address").insert({
        order_id,
        street: addressOrder.street,
        number: addressOrder.number,
        complement: addressOrder.complement,
        neighborhood: addressOrder.neighborhood,
        city: addressOrder.city,
        state: addressOrder.state,
        zipcode: addressOrder.zipCode,
      }); 

    return
  }
}

module.exports = AddressOrdersRepository;