const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UserService {
  constructor(UserRepository) {
    this.userRepository = UserRepository;
  }

  async createUser({ name, email, password, isAdmin }) {
    if(!name || !email || !password ) {
      throw new AppError('Fill in all the fields!');
    }

    const userExists = await this.userRepository.findUserByEmail(email);

    if(userExists) {
      throw new AppError("Email already registered");
    }

    const hashedPassword = await hash(password, 12);

    if(isAdmin) {
      const userCreated = await this.userRepository.createUser({ name, email, password: hashedPassword, isAdmin });
      return userCreated;
    } else {
      const userCreated = await this.userRepository.createUser({ name, email, password: hashedPassword, isAdmin });
      return userCreated;
    }

    
  }
}

module.exports = UserService;