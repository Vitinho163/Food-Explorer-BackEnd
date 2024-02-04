exports.up = knex => knex.schema.createTable("favorites", table => {
  table.increments('id').primary();
  table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.uuid("product_id").references("id").inTable("products").onDelete("CASCADE");
  
  table.timestamp("created_at").defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("favorites");