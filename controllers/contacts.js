const { NotFound } = require("http-errors");
const contactService = require("../services/contact");

class ContactController {
  async getAllContacts(req, res) {
    const { favorite, page, limit } = req.query;
    const { id } = req.user;
    const skip = (page - 1) * limit;

    if (favorite) {
      const favoriteContacts = await contactService.favoriteListContacts(
        id,
        favorite,
        skip,
        limit
      );
      res.status(200).json(favoriteContacts);
    } else {
      const contacts = await contactService.listContacts(id, skip, {
        limit: Number(limit),
      });
      res.status(200).json(contacts);
    }
  }

  async getContactById(req, res) {
    const { contactId } = req.params;
    const contact = await contactService.getContactById(contactId);

    if (!contact) res.status(404).send({ message: "Not found" });

    res.status(200).send(contact);
  }

  async createContact(req, res) {
    const { _id } = req.user;
    const contact = req.body;
    const newContact = await contactService.addContact({
      ...contact,
      owner: _id,
    });

    res.status(201).send(newContact);
  }

  async deleteContact(req, res) {
    const { contactId } = req.params;
    const existContact = await contactService.removeContact(contactId);

    if (!existContact) return res.status(404).send({ message: "Not found" });

    res.status(200).send({ message: "contact deleted" });
  }

  async updateContact(req, res) {
    const { contactId } = req.params;

    const contact = await contactService.updateContact(contactId, req.body, {
      new: true,
    });
    if (!contact) {
      throw NotFound(`Contact with id=${contactId} not found`);
    }
    res.json(contact);
  }

  async updateStatusContact(req, res) {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const contact = await contactService.updateStatusContact(
      contactId,
      { favorite },
      { new: true }
    );
    if (!contact) {
      throw NotFound(`Contact with id=${contactId} not found`);
    }
    res.json(contact);
  }
}

const contactController = new ContactController();
module.exports = { contactController };
