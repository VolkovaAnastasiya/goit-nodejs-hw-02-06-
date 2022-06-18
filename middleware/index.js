const catchHandler = require("./catchHandler");
const { checkContacRequest, validate } = require("./validates");
const auth = require("./auth");

module.exports = {
  catchHandler,
  checkContacRequest,
  validate,
  auth,
};
