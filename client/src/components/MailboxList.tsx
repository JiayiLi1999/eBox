// React imports.
import React from "react";

// Material-UI imports.
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";


import * as IMAP from "../function/IMAP";
import {Props} from "../constants/interfaces";

/**
 * Mailboxes.
 */
const onSetCurrentMailbox = async (props,inPath) => {
  // console.log(inPath);

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

    { props.mailboxes && props.mailboxes.map(value => {
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
