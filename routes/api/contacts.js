const express = require("express");
const { contactController: ctrl } = require("../../controllers/contacts");
const {
  auth,
  catchHandler,
  checkContacRequest,
  validate,
} = require("../../middleware");

const { joiShema, joiFavoriteSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, catchHandler(ctrl.getAllContacts));

router.get("/:contactId", auth, catchHandler(ctrl.getContactById));

router.post("/", auth, validate(joiShema), catchHandler(ctrl.createContact));

router.put(
  "/:contactId",
  auth,
  checkContacRequest(joiShema),
  catchHandler(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validate(joiFavoriteSchema),
  catchHandler(ctrl.updateStatusContact)
);

router.delete("/:contactId", auth, catchHandler(ctrl.deleteContact));

module.exports = router;
