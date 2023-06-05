const contacts = require('./contacts');
const { Command } = require("commander");

const program = new Command();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
        const totalContact = await contacts.listContacts();
        return console.table(totalContact);
    case "get":
        const contactByID = await contacts.getContactById(id);
        return console.table(contactByID);
    case "add":
        const newContact = await contacts.addContact(name, email, phone);
        return console.table(newContact);

    case "remove":
        const deleteContact = await contacts.removeContact(id);
        return console.table(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);