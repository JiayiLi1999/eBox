// React imports.
import React from "react";

// Material-UI imports.
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

import {Props} from "./BaseLayout";
import * as IMAP from "../function/IMAP";
import * as Contacts from "../function/Contacts";

const onDelete = async (props) => {
  props.pleaseWaitVisible(true);
  const imapWorker: IMAP.Worker = new IMAP.Worker();
  await imapWorker.deleteMessage(props.messageID, props.currentMailbox).then(props.deleteContact()).then(()=>{props.pleaseWaitVisible(false);});


}
const onSave = async (props) => {
  props.pleaseWaitVisible(true);
  const contactsWorker: Contacts.Worker = new Contacts.Worker();
  const contact: Contacts.IContact = await contactsWorker.addContact({ name : props.contactName, email : props.contactEmail }).then(props.saveContact());
  props.pleaseWaitVisible(false);
}

/**
 * ContactView.
 */


const ContactView = (props:Props) => (

  <form>

    <TextField margin="dense" id="contactName" label="Name" value={ props.contactName } variant="outlined"
      InputProps={{ style : { color : "#000000" } }} disabled={ props.currentView === "contact" } style={{ width:260 }}
      onChange={(Event)=> props.fieldChangeHandler({fieldName:Event.target.id,fieldValue:Event.target.value})} 
      />
    <br />
    <TextField margin="dense" id="contactEmail" label="Email" value={ props.contactEmail } variant="outlined"
      InputProps={{ style : { color:"#000000" } }} disabled={ props.currentView === "contact" } style={{ width:520 }}
      onChange={(Event)=> props.fieldChangeHandler({fieldName:Event.target.id,fieldValue:Event.target.value})} 
      // this.setState({ [inEvent.target.id] : inEvent.target.value }); 
      />
    <br />
    { /* Hide.show buttons as appropriate.  Note that we have to use this form of onClick() otherwise the event  */ }
    { /* object would be passed to addContact() and the branching logic would fail. */ }
    { props.currentView === "contactAdd" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10 }}
        onClick={() => onSave(props)}>
        Save
      </Button>
    }
    { props.currentView === "contact" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10, marginRight:10 }}
        onClick={()=>onDelete(props)}>
        Delete
      </Button>
    }
    { props.currentView === "contact" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10 }}
      onClick={ () => props.composeMessage("contact") }>
        Send Email</Button>
    }

  </form>

); /* ContactView. */


export default ContactView;
