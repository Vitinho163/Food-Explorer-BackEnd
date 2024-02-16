const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserRepository");
const UserServices = require("../services/UserService");

class UsersController {
  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;

    const userRepository = new UserRepository();
    const userServices = new UserServices(userRepository);

    if(!name) {
      throw new AppError('Name is required', 400);
    }

    const userCreated = await userServices.createUser({ name, email, password, isAdmin });

    response.status(201).json(userCreated)
  }
}

module.exports = UsersController