const catchHandler = require("./catchHandler");
const { checkContacRequest, validate } = require("./validates");
const auth = require("./auth");
const upload = require("./upload");

module.exports = {
  catchHandler,
  checkContacRequest,
  validate,
  auth,
  upload,
};
