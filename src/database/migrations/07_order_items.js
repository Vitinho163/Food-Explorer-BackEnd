exports.up = knex => knex.schema.createTable("order_items", table => {
  table.increments('id').primary();

  table.uuid("order_id").references("id").inTable("orders").onDelete("CASCADE")
  table.uuid("product_id").references("id").inTable("products")
  
  table.integer("quantity").notNullable();
  table.integer("Unit_price").notNullable();

  table.timestamp("created_at").defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("orders");