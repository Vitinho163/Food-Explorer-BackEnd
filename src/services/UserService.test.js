const UserRepositoryInMemory = require('../repositories/inMemory/UserRepositoryInMemory');
const UserService = require('./UserService');
const AppError = require('../utils/AppError');

describe("UserService", () => {
  let userRepositoryInMemory;
  let userService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userService = new UserService(userRepositoryInMemory);
  });

  it("should be able to create a new user", async() => {
    const user = {
      name: "Roberto",
      email: "Roberto@email.com",
      password: "1234"
    }

    const createdUser = await userService.createUser(user);

    expect(createdUser).toHaveProperty("id");
  });

  it("should not be able to create a new user with an existing email", async () => {
    const userOne = {
      name: "Victor",
      email: "victor@teste.com",
      password: "123"
    }

    const userTwo = {
      name: "Victor Souza",
      email: "victor@teste.com",
      password: "1234"
    }

    await userService.createUser(userOne);

    await expect(userService.createUser(userTwo)).rejects.toEqual(new AppError("Email already registered"));
});

})