const express = require("express");
// const { joiUserSchema } = require("../../models/user");
const {
  catchHandler,
  auth,
  //   checkContacRequest,
  //   validate,
} = require("../../middleware");
const { userControlles: ctrl } = require("../../controllers/users");

const router = express.Router();

router.get("/current", auth, catchHandler(ctrl.getCurrent));

module.exports = router;
