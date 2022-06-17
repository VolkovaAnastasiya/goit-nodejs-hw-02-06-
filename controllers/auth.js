const userService = require("../services/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserControlles {
  async signup(req, res) {
    const { password, email } = req.body;
    const user = await userService.getUserByEmail(email);

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const heshPass = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser({ password: heshPass, email });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email: newUser.email,
          password,
        },
      },
    });
  }

  async login(req, res) {
    const { password, email } = req.body;

    const user = await userService.getUserByEmail(email);
    const passCompare = await bcrypt.compare(password, user.password);

    if (!user || !passCompare) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
    await userService.updateUser({ id: user.id, token });

    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
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
