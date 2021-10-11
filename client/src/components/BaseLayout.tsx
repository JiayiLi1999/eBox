// React imports.
import React, { Component } from "react";

// Library imports.
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// App imports.
import Toolbar from "./Toolbar";
import MailboxList from "./MailboxList";
import MessageList from "./MessageList";
import ContactList from "./ContactList";
import WelcomeView from "./WelcomeView";
import ContactView from "./ContactView";
import MessageView from "./MessageView";
import { createState } from "../constants/state";
import { connect, ConnectedProps } from "react-redux";

import * as Contacts from "../function/Contacts";
import * as IMAP from "../function/IMAP";
import * as SMTP from "../function/SMTP";


interface Contact{ 
  _id : string,
  name : string,
  email : string 
}

interface mainInterface {
  contacts?: Contact[],
  isOn?: boolean,
  currentView ?: string,
  contactID ?: string,
  contactName ?: string,
  contactEmail ?: string,
  messageID ?: string,
  messageDate ?: string,
  messageFrom ?: string,
  messageTo ?: string,
  messageSubject ?: string,
  messageBody ?: string,
  // mailboxes ?: [ ],
  // messages ?: [ ],
  currentMailbox ?: string,
}

interface IContactView{ currentView : string, contactID : string, contactName : string, contactEmail : string }

interface DispatchProps {
  // showContact:(id:string,name:string,email:string)=>void
  addContactToList?:(inContact:Contacts.IContact)=>void;
  showContact?:(inContact:IContactView)=>void;
  saveContact?:()=>void;
  deleteContact?:()=>void;
}


const mapState = (state: mainInterface) => ({
  contacts:state.contacts,
  isOn: state.isOn,
  currentView : state.currentView,
  contactID : state.contactID,
  contactName : state.contactName,
  contactEmail : state.contactEmail,
  messageID : state.messageID,
  messageDate : state.messageDate,
  messageFrom : state.messageFrom,
  messageTo : state.messageTo,
  messageSubject : state.messageSubject,
  messageBody : state.messageBody,
  // mailboxes : state.mailboxes,
  // messages : state.messages,
  currentMailbox : state.currentMailbox,
})



export type Props =  mainInterface & DispatchProps;


const mapDispatch = {
  // showContact:(id,name,email) => ({inID: id, inName:name, inEmail:email}),
  addContactToList:(inContact) => ({type:"ADD_CONTACT_TO_LIST",payload:inContact}),
  showContact:(inContact:IContactView)=>({type:"SHOW_CONTACT",payload:inContact}),
  saveContact:()=>({type:"SAVE_CONTACT",payload:{}}),
  deleteContact:()=>({type:"DELETE_CONTACT",payload:{}}),
}

const connector = connect(mapState,mapDispatch);

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>
export interface MyProps extends PropsFromRedux {}


/**
 * BaseLayout.
 */
class BaseLayout extends React.Component<MyProps> {

  constructor(props) {
    super(props);
  }

  // baseComponent.state.showHidePleaseWait(true);
  // async function getMailboxes() {
  //   const imapWorker: IMAP.Worker = new IMAP.Worker();
  //   const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
  //   mailboxes.forEach((inMailbox) => {
  //     baseComponent.state.addMailboxToList(inMailbox);
  //   });
  // }
  componentDidMount(){
    this.getContacts().then(()=>console.log("finish"));
  }

  async getContacts() {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: Contacts.IContact[] = await contactsWorker.listContacts();
    contacts.forEach((inContact) => {
      this.props.addContactToList(inContact);
    });
    console.log("hi",contacts.length);
  }

  showContacts(){

    // this.setState({ currentView : "contact", contactID : inID, contactName : inName, contactEmail : inEmail });

  }
  // getMailboxes().then(function() {
  //   // Now go fetch the user's contacts.
  //   getContacts().then(() => baseComponent.state.showHidePleaseWait(false));
  // });


  /**
   * State data for the app.  This also includes all mutator functions for manipulating state.  That way, we only
   * ever have to pass this entire object down through props (not necessarily the best design in terms of data
   * encapsulation, but it does have the benefit of being quite a bit simpler).
   */
  state = createState(this);


  /**
   * Render().
   */
  render() {
    // this.getContacts().then(()=>console.log("finish"));
    return (

     <div className="appContainer">

      <Dialog open={ this.state.pleaseWaitVisible } disableBackdropClick={ true } disableEscapeKeyDown={ true }
        transitionDuration={ 0 }>
        <DialogTitle style={{ textAlign:"center" }}>Please Wait</DialogTitle>
        <DialogContent><DialogContentText>...Contacting server...</DialogContentText></DialogContent>
      </Dialog>

       <div className="toolbar"><Toolbar state={ this.state } /></div>

       <div className="mailboxList"><MailboxList state={ this.state } /></div>

       <div className="centerArea">
        <div className="messageList"><MessageList state={ this.state } /></div>
        <div className="centerViews">
          { this.props.currentView === "welcome" && <WelcomeView /> }
          { (this.props.currentView === "message" || this.props.currentView === "compose") &&
            <MessageView state={ this.state } />
          }
          { (this.props.currentView === "contact" || this.props.currentView === "contactAdd") &&
            <ContactView contactName={this.props.contactName} contactEmail={this.props.contactEmail} currentView={this.props.currentView} 
            deleteContact={this.props.deleteContact} saveContact={this.props.saveContact}/>
          }
        </div>
       </div>

       <div className="contactList">
        <ContactList contacts={this.props.contacts} showContact={this.props.showContact}/>
      </div>

     </div>
    );

  } /* End render(). */


} /* End class. */



export default connector(BaseLayout)
