const userService = require("../services/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

const { sendEmail } = require("../helpers");

class UserControlles {
  async signup(req, res) {
    const { password, email } = req.body;

    const user = await userService.getUserByEmail(email);

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const verificationToken = v4();
    const heshPass = await bcrypt.hash(password, 10);

    const newUser = await userService.createUser({
      password: heshPass,
      email,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Подтверждения email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
    };

    await sendEmail(mail);

    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email: newUser.email,
          password,
          avatarURL: newUser.avatarURL,
          verificationToken,
        },
      },
    });
  }

  async login(req, res) {
    const { password, email } = req.body;

    const user = await userService.getUserByEmail(email);
    const passCompare = await bcrypt.compare(password, user.password);

    if (!user || !user.verify || !passCompare) {
      return res.status(401).json({
        message: "Email is wrong or not verify, or password is wrong",
      });
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
    await userService.updateUser({ id: user.id, token });

    res.status(200).json({
      data: {
        token,
        user: { email: user.email, subscription: user.subscription },
      },
    });
  }

  async logout(req, res) {
    const { id } = req.user;
    await userService.updateUser({ id, token: null });

    res.status(204).json();
  }
}

const userControlles = new UserControlles();
module.exports = { userControlles };
