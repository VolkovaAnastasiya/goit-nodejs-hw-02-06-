const express = require("express");
const { contactController: ctrl } = require("../../controllers/contacts");
const {
  catchHandler,
  checkContacRequest,
  validate,
} = require("../../middleware");

const { joiShema, joiFavoriteSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", catchHandler(ctrl.getAllContacts));

router.get("/:contactId", catchHandler(ctrl.getContactById));

router.post("/", validate(joiShema), catchHandler(ctrl.createContact));

router.put(
  "/:contactId",
  checkContacRequest(joiShema),
  catchHandler(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validate(joiFavoriteSchema),
  catchHandler(ctrl.updateStatusContact)
);

router.delete("/:contactId", catchHandler(ctrl.deleteContact));

module.exports = router;
