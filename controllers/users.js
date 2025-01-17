const userService = require("../services/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../models/user");
const { sendEmail } = require("../helpers");

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

      const avatar = await Jimp.read(resultUpload);
      avatar.resize(250, 250).write(resultUpload);

      res.json({ avatarURL });
    } catch (error) {
      await fs.unlink(avatarPath);
      throw error;
    }
  }

  async verifyEmail(req, res) {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }
    await User.findByIdAndUpdate(user.id, {
      verify: true,
      verificationToken: null,
    });

    res.json({
      message: "Verify success",
    });
  }

  async againVerifyEmail(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Missing required field email" });
    }
    const user = await userService.getUserByEmail(email);

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const mail = {
      to: email,
      subject: "Welcome again to PhoneBook! Confirm Your Email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm Email</a>`,
    };
    await sendEmail(mail);

    res.json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  }
}

const userControlles = new UserControlles();
module.exports = { userControlles };
