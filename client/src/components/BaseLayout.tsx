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
  isVisible?:boolean,
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
  mailboxes ?: IMAP.IMailbox[],
  messages ?: IMAP.IMessage[],
  currentMailbox ?: string,
}

interface IContactView{ currentView ?: string, contactID ?: string, contactName ?: string, contactEmail ?: string }
interface fieldChanger{ fieldName:string,fieldValue:string}

interface DispatchProps {
  addContactToList?:(inContact:Contacts.IContact)=>void;
  addMailboxToList?:(inMailbox: IMAP.IMailbox)=>void;
  addMessageToList?:(inMessage: IMAP.IMessage)=>void;
  showContact?:(inContact:IContactView)=>void;
  saveContact?:()=>void;
  deleteContact?:()=>void;
  fieldChangeHandler?:(field:fieldChanger)=>void;
  composeMessage?:(inType:string)=>void;
  addContact?:()=>void;
  setCurrentMailbox?:(inPath: string)=>void;
  getMessage?:(messages: IMAP.IMessage[])=>void;
  clearMessages ?: ()=>void;
  showMessage?:(inMessage: IMAP.IMessage,mb: string)=>void;
  sendMessage?:()=>void;
  deleteMessage?:()=>void;
  pleaseWaitVisible?:(inVisible: boolean)=>void;
}


const mapState = (state: mainInterface) => ({
  isVisible:state.isVisible,
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
  mailboxes : state.mailboxes,
  messages : state.messages,
  currentMailbox : state.currentMailbox,
})



export type Props =  mainInterface & DispatchProps;


const mapDispatch = {
  // showContact:(id,name,email) => ({inID: id, inName:name, inEmail:email}),
  addContactToList:(inContact) => ({type:"ADD_CONTACT_TO_LIST",payload:inContact}),
  addMailboxToList:(inMailbox)=>({type:"ADD_MAILBOX_TO_LIST",payload:inMailbox}),
  addMessageToList:(inMessage: IMAP.IMessage)=>({type:"ADD_MESSAGE_TO_LIST",payload:inMessage}),
  showContact:(inContact:IContactView)=>({type:"SHOW_CONTACT",payload:inContact}),
  saveContact:()=>({type:"SAVE_CONTACT",payload:{}}),
  deleteContact:()=>({type:"DELETE_CONTACT",payload:{}}),
  fieldChangeHandler:(field)=>({type:"FIELD_CHANGE",payload:field}),
  composeMessage:(inType:string)=>({type:inType,payload:{}}),
  addContact:()=>({type:"ADD_CONTACT",payload:{}}),
  setCurrentMailbox:(inPath)=>({type:"SET_CURRENT_MAILBOX",payload:inPath}),
  getMessage:(messages)=>({type:"GET_MESSAGE",payload:messages}),
  clearMessages:()=>({type:"CLEAR_MESSAGES",payload:{}}),
  showMessage:(inMessage: IMAP.IMessage,mb: string)=>({type:"SHOW_MESSAGE",payload:{inMessage,mb}}),
  sendMessage:()=>({type:"SEND_MESSAGE",payload:{}}),
  deleteMessage:()=>({type:"DELETE_MESSAGE",payload:{}}),
  pleaseWaitVisible:(inVisible)=>({type:"PLEASE_WAIT_VISIBLE",payload:{inVisible}}),
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

  componentDidMount(){
    // console.log("mailboxes start:")
    this.props.pleaseWaitVisible(true);
    this.getMailboxes().then(()=>this.getContacts().then(()=>console.log("finish")))
      .then(()=>{this.props.pleaseWaitVisible(false);});

  }

  async getMailboxes() {
    const imapWorker: IMAP.Worker = new IMAP.Worker();
    const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
    mailboxes.forEach((inMailbox) => {
      this.props.addMailboxToList(inMailbox);
    });
    console.log("mailboxes length:",mailboxes.length)
  }

  async getContacts() {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: Contacts.IContact[] = await contactsWorker.listContacts();
    contacts.forEach((inContact) => {
      this.props.addContactToList(inContact);
    });
    console.log("hi",contacts.length);
  }



  /**
   * State data for the app.  This also includes all mutator functions for manipulating state.  That way, we only
   * ever have to pass this entire object down through props (not necessarily the best design in terms of data
   * encapsulation, but it does have the benefit of being quite a bit simpler).
   */
  // state = createState(this);


  /**
   * Render().
   */
  render() {
    // this.getContacts().then(()=>console.log("finish"));
    return (

     <div className="appContainer">

      <Dialog open={ this.props.isVisible } disableBackdropClick={ true } disableEscapeKeyDown={ true }
        transitionDuration={ 0 }>
        <DialogTitle style={{ textAlign:"center" }}>Please Wait</DialogTitle>
        <DialogContent><DialogContentText>...Contacting server...</DialogContentText></DialogContent>
      </Dialog>

       <div className="toolbar"><Toolbar composeMessage={this.props.composeMessage} addContact={this.props.addContact} /></div>

       <div className="mailboxList"><MailboxList mailboxes={this.props.mailboxes} currentView={this.props.currentView} setCurrentMailbox={this.props.setCurrentMailbox} 
        clearMessages={this.props.clearMessages} addMessageToList = {this.props.addMessageToList} pleaseWaitVisible={this.props.pleaseWaitVisible}/></div>

       <div className="centerArea">
        <div className="messageList"><MessageList messages={this.props.messages} showMessage={this.props.showMessage} pleaseWaitVisible={this.props.pleaseWaitVisible}/></div>
        <div className="centerViews">
          { this.props.currentView === "welcome" && <WelcomeView /> }
          { (this.props.currentView === "message" || this.props.currentView === "compose") &&
            <MessageView currentView={this.props.currentView} messageID={this.props.messageID} messageBody={this.props.messageBody} composeMessage={this.props.composeMessage} pleaseWaitVisible={this.props.pleaseWaitVisible}
            messageDate={this.props.messageDate} messageFrom={this.props.messageFrom} messageTo={this.props.messageTo} sendMessage={this.props.sendMessage} deleteMessage={this.props.deleteMessage}/>
          }
          { (this.props.currentView === "contact" || this.props.currentView === "contactAdd") &&
            <ContactView contactName={this.props.contactName} contactEmail={this.props.contactEmail} currentView={this.props.currentView} pleaseWaitVisible={this.props.pleaseWaitVisible}
            deleteContact={this.props.deleteContact} saveContact={this.props.saveContact} fieldChangeHandler={this.props.fieldChangeHandler} composeMessage={this.props.composeMessage}/>
          }
        </div>
       </div>

       <div className="contactList">
        <ContactList contacts={this.props.contacts} showContact={this.props.showContact} pleaseWaitVisible={this.props.pleaseWaitVisible}/>
      </div>

     </div>
    );

  } /* End render(). */


} /* End class. */



export default connector(BaseLayout)
