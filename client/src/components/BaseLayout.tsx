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
import { connect, ConnectedProps } from "react-redux";

import * as Contacts from "../function/Contacts";
import * as IMAP from "../function/IMAP";
import * as SMTP from "../function/SMTP";

import * as Interfaces from "../constants/interfaces";


const connector = connect(Interfaces.mapState,Interfaces.mapDispatch);

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

/**
 * BaseLayout.
 */
class BaseLayout extends React.Component<PropsFromRedux> {

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
