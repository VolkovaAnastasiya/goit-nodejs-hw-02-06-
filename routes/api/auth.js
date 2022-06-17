const express = require("express");
const { joiUserSchema } = require("../../models/user");
const {
  catchHandler,
  checkContacRequest,
  validate,
} = require("../../middleware");
const { userControlles: ctrl } = require("../../controllers/auth");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post(
  "/signup",
  [checkContacRequest(), validate(joiUserSchema)],
  catchHandler(ctrl.signup)
);

router.post(
  "/login",
  validate(joiUserSchema),
  checkContacRequest(),
  catchHandler(ctrl.login)
);

router.get("/logout", auth, catchHandler(ctrl.logout));

module.exports = router;
