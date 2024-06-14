exports.up = knex => knex.schema.createTable("order_address", table => {
  table.increments('id').primary();

  table.uuid("order_id").references("id").inTable("orders").onDelete("CASCADE");
  
  table.text("street").notNullable();
  table.integer("number").notNullable();
  table.text("complement");
  table.text("neighborhood").notNullable();
  table.text("city").notNullable()
  table.text("state").notNullable();
  table.text("zipcode").notNullable();

  table.timestamp("created_at").defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("order_address");