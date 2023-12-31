import contacts from "./contacts.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.table(list);
      break;

    case "get":
      const contactId = await contacts.getContactById(id);
      console.table(contactId);
      break;

    case "add":
      const add = await contacts.addContact(name, email, phone);
      console.table(add);
      break;

    case "remove":
      const remove = await contacts.removeContact(id);
      console.table(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
