exports.up = knex => knex.schema.createTable("products", table => {
  table.increments('id').primary();
  table.text("name").notNullable();
  table.text("description").notNullable();
  table.integer("price").notNullable();
  table.enum("category", ["food", "drink", "desert"]).notNullable();
  table.text("image")
  
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("products");