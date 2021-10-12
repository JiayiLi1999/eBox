// React imports.
import React from "react";

// Material-UI imports.
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Person from "@material-ui/icons/Person";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';


import * as IMAP from "../function/IMAP";
import {Props} from "./BaseLayout";

/**
 * Mailboxes.
 */
const onSetCurrentMailbox = async (props,inPath) => {
  // console.log(inPath);

  // const contactsWorker: Contacts.Worker = new Contacts.Worker();
  // const contact: Contacts.IContact = await contactsWorker.addContact({ name : props.contactName, email : props.contactEmail }).then(props.saveContact());
  
  props.setCurrentMailbox(inPath);
  props.clearMessages();
  props.pleaseWaitVisible(true);
  const imapWorker: IMAP.Worker = new IMAP.Worker();
  const messages: IMAP.IMessage[] = await imapWorker.listMessages(inPath);
  props.pleaseWaitVisible(false);
  messages.forEach((inMessage: IMAP.IMessage) => {
    // console.log(inMessage)
    props.addMessageToList(inMessage);
  });
}

var index=0;

const MailboxList = (props:Props) => (

  <List>

    { props.mailboxes.map(value => {
      // console.log("123",value);
      return (
        <Chip key={index++} label={ `${value.name}` }
         onClick={ () => onSetCurrentMailbox(props,value.path) }
          style={{ width:128, marginBottom:10 }}
          color={ props.currentMailbox === value.path ? "secondary" : "primary" } />
      );
    })
  }

  </List>

); /* Mailboxes. */


export default MailboxList;
