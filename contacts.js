import { promises as fs } from "fs";
import { join } from "path";
import { nanoid } from "nanoid";

const contactsPath = join("./db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  const [remove] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return remove;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  const data = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, data);
  return newContact;
}

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
