// Node imports.
import path from "path";

// Library imports.
import express, { Express, NextFunction, Request, Response } from "express";

// App imports.
import { serverInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import { IContact } from "./Contacts";
import { MailOptions } from "nodemailer/lib/json-transport";


// Our Express app.
const app: Express = express();


// Handle JSON in request bodies.
app.use(express.json());


// Serve the client.
app.use("/", express.static(path.join(__dirname, "../../client/dist")));


// Enable CORS so that we can call the API even from anywhere.
app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction) {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  inNext();
});


// ---------- RESTful endpoint operations begin. ----------


// Get list of mailboxes.
app.get("/mailboxes",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /mailboxes (1)");
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
      console.log("GET /mailboxes (1): Ok", mailboxes);
      inResponse.json(mailboxes);
    } catch (inError) {
      console.log("GET /mailboxes (1): Error", inError);
      inResponse.send("error");
    }
  }
);


// Get list of messages in a mailbox (does NOT include bodies).
app.get("/mailboxes/:mailbox",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /mailboxes (2)", inRequest.params.mailbox);
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const messages: IMAP.IMessage[] = await imapWorker.listMessages({
        mailbox : inRequest.params.mailbox
      });
      console.log("GET /mailboxes (2): Ok", messages);
      inResponse.json(messages);
    } catch (inError) {
      console.log("GET /mailboxes (2): Error", inError);
      inResponse.send("error");
    }
  }
);


// Get a message's plain text body.
app.get("/messages/:mailbox/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /messages (3)", inRequest.params.mailbox, inRequest.params.id);
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const messageBody: string = await imapWorker.getMessageBody({
        mailbox : inRequest.params.mailbox,
        id : parseInt(inRequest.params.id, 10)
      });
      console.log("GET /messages (3): Ok", messageBody);
      inResponse.send(messageBody);
    } catch (inError) {
      console.log("GET /messages (3): Error", inError);
      inResponse.send("error");
    }
  }
);

// Get list of namespaces
app.get("/namespaces",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /namespaces", inRequest.params.name);
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const namespaces: IMAP.IMailbox[] = await imapWorker.listNamespaces();
      console.log("GET /namespaces (2): Ok", namespaces);
      inResponse.send("ok");
    } catch (inError) {
      console.log("GET /namespaces (2): Error", inError);
      inResponse.send("error");
    }
  }
);


// Get list of messages in a mailbox (does NOT include bodies).
app.get("/searchUnseenMessages",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /searchUnseenMessages (2)", inRequest.params.mailbox);
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const uids: number[] = await imapWorker.searchUnseenMessage();
      const sequence:string = uids.join(',');
      const messages : string[] = await imapWorker.getMessagewithUids(
        sequence,
      );
      console.log("GET /searchUnseenMessages (2): Ok", messages);
      inResponse.json(messages);
    } catch (inError) {
      console.log("GET /searchUnseenMessages (2): Error", inError);
      inResponse.send("error");
    }
  }
);

// Delete a message.
app.delete("/messages/:mailbox/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("DELETE /messages");
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      await imapWorker.deleteMessage({
        mailbox : inRequest.params.mailbox,
        id : parseInt(inRequest.params.id, 10)
      });
      console.log("DELETE /messages: Ok");
      inResponse.send("ok");
    } catch (inError) {
      console.log("DELETE /messages: Error", inError);
      inResponse.send("error");
    }
  }
);




// Send a message.
app.post("/messages",
  async (inRequest: Request, inResponse: Response) => {
    console.log("POST /messages", inRequest.body);
    try {
      const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
      await smtpWorker.sendMessage(inRequest.body);
      console.log("POST /messages: Ok");
      inResponse.send("ok");
    } catch (inError) {
      console.log("POST /messages: Error", inError);
      inResponse.send("error");
    }
  }
);


// List contacts.
app.get("/contacts",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /contacts");
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contacts: IContact[] = await contactsWorker.listContacts();
      console.log("GET /contacts: Ok", contacts);
      inResponse.json(contacts);
    } catch (inError) {
      console.log("GET /contacts: Error", inError);
      inResponse.send("error");
    }
  }
);

// Get contact's name by email.
app.get("/contacts/nameByEmail/:email",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /contacts/nameByEmail/:email");
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contact: string = await contactsWorker.getContactNameByEmail(inRequest.params.email);
      console.log("GET /contacts/nameByEmail/:email: Ok", contact);
      inResponse.json(contact);
    } catch (inError) {
      console.log("GET /contacts/nameByEmail/:email: Error", inError);
      inResponse.send("error");
    }
  }
);

// Get contact's email by name.
app.get("/contacts/emailByName/:name",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /contacts/emailByName/:name");
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contact: string = await contactsWorker.getContactEmailByName(inRequest.params.name);
      console.log("GET /contacts/emailByName/:name: Ok", contact);
      inResponse.json(contact);
    } catch (inError) {
      console.log("GET /contacts/emailByName/:name: Error", inError);
      inResponse.send("error");
    }
  }
);


// Add a contact.
app.post("/contacts",
  async (inRequest: Request, inResponse: Response) => {
    console.log("POST /contacts", inRequest.body);
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contact: IContact = await contactsWorker.addContact(inRequest.body);
      console.log("POST /contacts: Ok", contact);
      inResponse.json(contact);
    } catch (inError) {
      console.log("POST /contacts: Error", inError);
      inResponse.send("error");
    }
  }
);


// Delete a contact.
app.delete("/contacts/deleteContact/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("DELETE /contacts", inRequest.body);
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.deleteContact(inRequest.params.id);
      console.log("Contact deleted");
      inResponse.send("ok");
    } catch (inError) {
      console.log(inError);
      inResponse.send("error");
    }
  }
);


// Delete all contacts.
app.delete("/contacts/deleteAll",
  async (inRequest: Request, inResponse: Response) => {
    console.log("DELETE /contacts/deleteAll", inRequest.body);
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.deleteAllContact();
      console.log("All contacts deleted");
      inResponse.send("ok");
    } catch (inError) {
      console.log(inError);
      inResponse.send("error");
    }
  }
);

// Update a contact.
app.put("/contacts/:id",
  async(inRequest:Request,inResponse:Response) => {
    console.log("Update /contracts",inRequest.body);
    try{
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.updateContact(inRequest.params.id,inRequest.body);
      console.log("Contact updated");
      inResponse.send("ok");
    }catch(inError){
      console.log(inError);
      inResponse.send("error");
    }
  }
)



// Start app listening.
app.listen(80, () => {
  console.log("MailBag server open for requests");
});
