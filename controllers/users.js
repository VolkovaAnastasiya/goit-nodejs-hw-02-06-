const userService = require("../services/user");
const path = require("path");
const fs = require("fs/promises");
// const Jimp = require("jimp");

class UserControlles {
  async getUserBiId(req, res) {
    const { id } = req.user;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(user);
  }

  async getCurrent(req, res) {
    const { email, id, subscription } = req.user;

    res.status(200).json({ email, id, subscription });
  }

  async deleteUserBiId(req, res) {
    const { id } = req.user;
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }
    await userService.removeUser(id);
    res.status(200).json({ message: "User deleted" });
  }

  async updateUserSubscription(req, res) {
    const { id } = req.user;
    const { subscription } = req.body;
    const user = await userService.updateUser({ id, subscription });

    if (!user) return res.status(404).send({ message: "Not found" });

    res.status(200).send({ message: "user subscription updated" });
  }

  async updateAvatar(req, res) {
    const { path: avatarPath, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;

    try {
      const avatarsDir = path.join(process.cwd(), "public", "avatars");
      const resultUpload = path.join(avatarsDir, imageName);
      await fs.rename(avatarPath, resultUpload);

      const avatarURL = path.join("public", "avatars", imageName);
      await userService.updateUser({ id, avatarURL });

      // const avatar = await Jimp.read(avatarPath);
      // avatar.cover(250, 250).write(avatarPath);

      res.json({ avatarURL });
    } catch (error) {
      await fs.unlink(avatarPath);
      throw error;
    }
  }
}

const userControlles = new UserControlles();
module.exports = { userControlles };
