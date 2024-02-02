exports.up = knex => knex.schema.createTable("ingredients", table => {
  table.increments('id').primary();
  table.text("name").notNullable();
  table.uuid("product_id").references("id").inTable("products").onDelete("CASCADE");
  
  table.timestamp("created_at").defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("ingredients");