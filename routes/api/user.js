const express = require("express");

const { catchHandler, auth, upload, validate } = require("../../middleware");
const { userControlles: ctrl } = require("../../controllers/users");
const { shemaJoiUpdateSubscription } = require("../../models/user");

const router = express.Router();

router.get("/current", auth, catchHandler(ctrl.getCurrent));
router.put(
  "/subscription",
  auth,
  validate(shemaJoiUpdateSubscription),
  catchHandler(ctrl.updateUserSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  catchHandler(ctrl.updateAvatar)
);
router.get("/verify/:verificationToken", catchHandler(ctrl.verifyEmail));
router.post("/verify", catchHandler(ctrl.againVerifyEmail));

module.exports = router;
