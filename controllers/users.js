class UserControlles {
  async getCurrent(req, res) {
    const { email, id, subscription } = req.user;

    res.status(200).json({ email, id, subscription });
  }
}

const userControlles = new UserControlles();
module.exports = { userControlles };
