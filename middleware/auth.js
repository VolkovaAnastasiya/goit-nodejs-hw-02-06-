// const passport = require("passport");

// const auth = (req, res, next) => {
//   passport.authenticate("jwt", { session: false }, (err, user) => {
//     if (!user || err || !user.token) {
//       return res.status(401).json({ message: "Not authorized" });
//     }
//     req.user = user;
//     next();
//   })(req, res, next);
// };

// module.exports = auth;

const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log("id: ", id);
    const user = await User.findById(id);
    if (!user || !user.token || bearer !== "Bearer") {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
