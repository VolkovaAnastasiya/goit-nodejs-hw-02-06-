const { NotFound } = require("http-errors");
const { Contact } = require("../models/contact");

class ContactController {
  async getAllContacts(req, res) {
    const contacts = await Contact.find({});

    res.status(200).send(contacts);
  }

  async getContactById(req, res) {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) res.status(404).send({ message: "Not found" });

    res.status(200).send(contact);
  }

  async createContact(req, res) {
    const contact = req.body;
    const newContact = await Contact.create(contact);

    res.status(201).send(newContact);
  }

  async deleteContact(req, res) {
    const { contactId } = req.params;
    const existContact = await Contact.findByIdAndDelete(contactId);

    if (!existContact) return res.status(404).send({ message: "Not found" });

    res.status(200).send({ message: "contact deleted" });
  }

  async updateContact(req, res) {
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
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
    
    const contact = await Contact.findByIdAndUpdate(
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
