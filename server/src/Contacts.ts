// Node imports.
import * as path from "path";


// Library imports.
const Datastore = require("nedb");


// Define interface to describe a contact.  Note that we'll only have an _id field when retrieving or adding, so
// it has to be optional.
export interface IContact {
  _id?: number,
  name: string,
  email: string
}


// The worker that will perform contact operations.
export class Worker {


  // The Nedb Datastore instance for contacts.
  private db: Nedb;


  /**
   * Constructor.
   */
  constructor() {

    this.db = new Datastore({
      filename : path.join(__dirname, "contacts.db"),
      autoload : true
    });

  } /* End constructor. */


  /**
   * Lists all contacts.
   *
   * @return A promise that eventually resolves to an array of IContact objects.
   */
  public listContacts(): Promise<IContact[]> {

    console.log("Contacts.Worker.listContacts()");

    return new Promise((inResolve, inReject) => {
      this.db.find(
        {},
        (inError: Error, inDocs: IContact[]) => {
          if (inError) {
            console.log("Contacts.Worker.listContacts(): Error", inError);
            inReject(inError);
          } else {
            console.log("Contacts.Worker.listContacts(): Ok", inDocs);
            inResolve(inDocs);
          }
        }
      );
    });

  } /* End listContacts(). */


  /**
   * Add a new contact.
   *
   * @param  inContact The contact to add.
   * @return           A promise that eventually resolves to an IContact object.
   */
  public addContact(inContact: IContact): Promise<IContact> {

    console.log("Contacts.Worker.addContact()", inContact);

    return new Promise((inResolve, inReject) => {
      this.db.insert(
        inContact,
        (inError: Error, inNewDoc: IContact) => {
          if (inError) {
            console.log("Contacts.Worker.addContact(): Error", inError);
            inReject(inError);
          } else {
            console.log("Contacts.Worker.addContact(): Ok", inNewDoc);
            inResolve(inNewDoc);
          }
        }
      );
    });

  } /* End addContact(). */


  /**
   * Delete a contact.
   *
   * @param  inID The ID of the contact to delete.
   * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
   */
  public deleteContact(inID: string): Promise<string> {

    console.log("Contacts.Worker.deleteContact()", inID);

    return new Promise((inResolve, inReject) => {
      this.db.remove(
        { _id : inID },
        { },
        (inError: Error, inNumRemoved: number) => {
          if (inError) {
            console.log("Contacts.Worker.deleteContact(): Error", inError);
            inReject(inError);
          } else {
            console.log("Contacts.Worker.deleteContact(): Ok", inNumRemoved);
            inResolve("ok");
          }
        }
      );
    });

  } /* End deleteContact(). */


    /**
   * Delete all contacts.
   *
   * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
   */
     public deleteAllContact(): Promise<string> {

      console.log("Contacts.Worker.deleteAllContact()");
  
      return new Promise((inResolve, inReject) => {
        this.db.remove(
          {}, { multi: true },
          (inError: Error, inNumRemoved: number) => {
            if (inError) {
              console.log("Contacts.Worker.deleteAllContact(): Error", inError);
              inReject(inError);
            } else {
              console.log("Contacts.Worker.deleteAllContact(): Ok", inNumRemoved);
              inResolve("ok");
            }
          }
        );
      });
  
    } /* End deleteContact(). */



  /**
   * Update a contact.
   *
   * @param  inID The ID of the contact to delete.
   * @param  inContact The information to update.
   * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
   */

  updateContact(inID: string, inContact: IContact): Promise<string> {
    console.log("Contacts.Worker.updateContact()", inID,inContact);
    return new Promise((inResolve,inReject)=>{
      this.db.update({_id:inID},inContact,{},
        (inError:Error,inNumUpdated: number,isUpsert:boolean)=>{
          if(inError){
            console.log("Contacts.Worker.updateContact(): Error", inError);
            inReject(inError);
          }else{
            console.log("Contacts.Worker.updateContact(): Ok", inNumUpdated);
            inResolve("ok");
          }
        })
    })
  }

  /**
   * Get a contact's name by email.
   *
   * @param  email The email of the contact to query.
   * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
   */

   getContactNameByEmail(email: string): Promise<string> {
    console.log("Contacts.Worker.getContactNameByEmail()", email);
    return new Promise((inResolve,inReject)=>{
      this.db.findOne({email},
        (inError:Error, inDocs: IContact)=>{
          if(inError){
            console.log("Contacts.Worker.getContactNameByEmail(): Error", inError);
            inReject(inError);
          }else{
            let contactName:string = inDocs.name||"None";
            console.log("Contacts.Worker.getContactNameByEmail(): Ok", contactName);
            inResolve(contactName);
          }
        })
    })
  }


    /**
   * Get a contact's email by name.
   *
   * @param  name The name of the contact to query.
   * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
   */

     getContactEmailByName(name: string): Promise<string> {
      console.log("Contacts.Worker.getContactEmailByName()", name);
      return new Promise((inResolve,inReject)=>{
        this.db.findOne({name},
          (inError:Error, inDocs: IContact)=>{
            if(inError){
              console.log("Contacts.Worker.getContactEmailByName(): Error", inError);
              inReject(inError);
            }else{
              let contactEmail:string = inDocs.email||"None";
              console.log("Contacts.Worker.getContactEmailByName(): Ok", contactEmail);
              inResolve(contactEmail);
            }
          })
      })
    }

  

} /* End class. */
