const knex = require("../database/knex");

class UserRepository {
  async createUser({ name, email, password, isAdmin }) {

    if(isAdmin) {
      const user = await knex("users").insert({ name, email, password, isAdmin }).returning("*");
      return user;
    } else {
      const user = await knex("users").insert({ name, email, password }).returning("*");
      return user;
    }
  }

  async findUserByEmail(email) {
    const user = await knex("users").where({ email }).first();

    return user;
  }

  async findUserById(id) {
    const user = await knex("users").where({ id}).first();

    return user;
  }

}

module.exports = UserRepository;