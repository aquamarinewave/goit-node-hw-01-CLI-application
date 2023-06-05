const fs = require("fs/promises");
const path = require('path');
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: 
const listContacts = async () => {
    const data = await  fs.readFile(contactsPath);
    const todoList = JSON.parse(data);
    return todoList;
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  }


const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
    if (contactIndex === -1) {
        return null;
    }
    const [deleteContact] = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deleteContact;
}

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};