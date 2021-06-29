const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    error.message("Cannnot read contacts file");
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const findContact = contacts.find((item) => item.id === Number(contactId));
    if (!findContact) {
      throw new Error("ID is incorrect");
    }
    return console.table(findContact);
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: v4(), name, email, phone };

  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const newContacts = [...contacts, newContact];
    console.table(newContacts);

    const str = JSON.stringify(newContacts);
    fs.writeFile(contactsPath, str);
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const filterContacts = contacts.filter((item) => item.id !== Number(contactId));
    console.table(filterContacts);
    const str = JSON.stringify(filterContacts);
    fs.writeFile(contactsPath, str);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
