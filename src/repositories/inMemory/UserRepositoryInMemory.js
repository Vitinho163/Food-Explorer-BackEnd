class UserRepositoryInMemory {
  constructor() {
    this.id = Math.floor(Math.random() * 1000) + 1
    this.users = [];
  }

  async createUser({ name, email, password }) {
    const user = {
      id: this.id,
      name,
      email,
      password
    }

    this.users.push(user);

    return this.users[0]
  }

  async findUserByEmail(email) {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async findUserById(id) {
    const user = this.users.find(user => user.id === id);

    return user;
  }
}

module.exports = UserRepositoryInMemory;