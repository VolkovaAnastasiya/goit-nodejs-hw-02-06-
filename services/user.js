const { User } = require("../models/user");

class UserService {
  async getUserById(userId) {
    return await User.findById(userId);
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  async removeUser(id) {
    return await User.findByIdAndDelete(id);
  }

  async createUser(body) {
    return await User.create(body);
  }

  async updateUser(body) {
    return await User.findByIdAndUpdate(body.id, { ...body });
  }

  async updateUserAvatar(body) {
    return await User.findByIdAndUpdate(
      body.id,
      { ...body.avatarUrl },
      { new: true }
    );
  }
}

const userService = new UserService();
module.exports = userService;
