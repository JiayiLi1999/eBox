// React imports.
import React from "react";
import { InputBase } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {Props} from "../constants/interfaces";
import * as IMAP from "../function/IMAP";
import * as SMTP from "../function/SMTP";

/**
 * MessageView.
 */

const onSendMessage = async(props) =>{
  props.pleaseWaitVisible(true);
  const imapWorker: IMAP.Worker = new IMAP.Worker();
  await imapWorker.deleteMessage(props.messageID, props.currentMailbox).then(()=>{props.pleaseWaitVisible(false);});
  props.deleteMessage();
}

const onDeleteMessage = async(props) =>{
  props.pleaseWaitVisible(true);
  const smtpWorker: SMTP.Worker = new SMTP.Worker();
  await smtpWorker.sendMessage(props.messageTo, props.messageFrom, props.messageSubject,props.messageBody).then(()=>{props.pleaseWaitVisible(false);});
  props.sendMessage();
}

const MessageView = ( props:Props ) => (

  <form>

    { /* ----- Message ID and date, just for informational purposes. ----- */ }
    { props.currentView === "message" &&
      <InputBase defaultValue={ `ID ${props.messageID}` } margin="dense" disabled={ true } fullWidth={ true }
        className="messageInfoField" />
    }
    { props.currentView === "message" && <br /> }
    { props.currentView === "message" &&
      <InputBase defaultValue={ props.messageDate } margin="dense" disabled={ true } fullWidth={ true }
        className="messageInfoField" />
    }
    { props.currentView === "message" && <br /> }

    { /* ----- From. ----- */ }
    { props.currentView === "message" &&
      <TextField margin="dense" variant="outlined" fullWidth={ true } label="From" value={ props.messageFrom }
        disabled={ true } InputProps={{ style : { color : "#000000" } }} />
    }
    { props.currentView === "message" && <br /> }

    { /* ----- To. ----- */ }
    { props.currentView === "compose" &&
      <TextField margin="dense" id="messageTo" variant="outlined" fullWidth={ true } label="To"
        value={ props.messageTo } InputProps={{ style : { color : "#000000" } }}
        // onChange={ props.fieldChangeHandler } 
        />
    }
    { props.currentView === "compose" && <br /> }

    { /* ----- Subject. ----- */ }
    <TextField margin="dense" id="messageSubject" label="Subject" variant="outlined" fullWidth={ true }
      value={ props.messageSubject } disabled={ props.currentView === "message" }
      InputProps={{ style : { color : "#000000" } }} 
      // onChange={ props.fieldChangeHandler } 
      />
    <br />

    { /* ----- Message body. ----- */ }
    <TextField margin="dense" id="messageBody" variant="outlined" fullWidth={ true } multiline={ true } rows={ 12 }
      value={ props.messageBody } disabled={ props.currentView === "message" }
      InputProps={{ style : { color : "#000000" } }} 
      // onChange={ props.fieldChangeHandler } 
      />

    { /* ----- Buttons. ----- */ }

    { props.currentView === "compose" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10 }}
        onClick={()=>onSendMessage(props)}
        >
      Send
    </Button>
    }
    { props.currentView === "message" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10, marginRight:10 }}
        onClick={ () => props.composeMessage("reply") }>
        Reply
      </Button>
    }
    { props.currentView === "message" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10 }}
        onClick={() => onDeleteMessage(props) }
        >
        Delete
      </Button>
    }

  </form>

); /* MessageView. */


export default MessageView;
