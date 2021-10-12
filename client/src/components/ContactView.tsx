// React imports.
import React from "react";

// Material-UI imports.
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

import {Props} from "../constants/interfaces";
import * as IMAP from "../function/IMAP";
import * as Contacts from "../function/Contacts";


/**
 * ContactView.
 */

interface States{
  stateName:string,
  stateEmail:string,
}
interface derivedInterface{
  contactName?:string,
  contactEmail?:string,
  stateName?:string,
}

class ContactView extends React.Component<Props,States>{
  constructor(props){
    super(props);
    this.state={
      stateEmail:"",
      stateName: "",
    }
    this.onDelete.bind(this);
    this.onSave.bind(this);

  }
  async onDelete(){
    this.props.pleaseWaitVisible(true);
    const imapWorker: IMAP.Worker = new IMAP.Worker();
    await imapWorker.deleteMessage(this.props.messageID, this.props.currentMailbox).then(()=>this.props.deleteContact()).then(()=>{this.props.pleaseWaitVisible(false);});
  }
  async onSave(){
    this.props.pleaseWaitVisible(true);
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contact:Contacts.IContact = await contactsWorker.addContact({ name : this.state.stateName, email : this.state.stateEmail });
    this.props.saveContact(contact);
    this.props.pleaseWaitVisible(false);
  }

//   static getDerivedStateFromProps(nextProps, prevState) {
//     console.log("nextProps",nextProps);
//     let derivedProps:derivedInterface = {}
//     const {contactEmail,contactName} = nextProps;
//     if (contactEmail !== prevState.contactEmail) {
//         derivedProps.contactEmail = contactEmail;
//     }
//     if (contactName !== prevState.contactName) {
//       derivedProps.contactName = contactName
//     }
//     // if(stateName!==prevState.stateName){
//     //   derivedProps.stateName = stateName
//     // }
//     if(derivedProps==={}) return null;
//     return derivedProps;
// }

  render(){
    return(
      <form>

      { /* Hide.show buttons as appropriate.  Note that we have to use this form of onClick() otherwise the event  */ }
      { /* object would be passed to addContact() and the branching logic would fail. */ }
      { this.props.currentView === "contactAdd" &&
      <div>
        <TextField margin="dense" id="contactName" label="Name" value={ this.state.stateName } variant="outlined"
          InputProps={{ style : { color : "#000000" } }} disabled={ false } style={{ width:260 }}
          onChange={(Event)=> this.setState({stateName:Event.target.value})} 
          />
        <br />
        <TextField margin="dense" id="contactEmail" label="Email" value={ this.state.stateEmail } variant="outlined"
          InputProps={{ style : { color:"#000000" } }} disabled={ false } style={{ width:520 }}
          onChange={(Event)=> this.setState({stateEmail:Event.target.value})} 
          />
        <br />
        <Button variant="contained" color="primary" size="small" style={{ marginTop:10 }}
          onClick={() => this.onSave()}>
          Save
        </Button>
      </div>
        
      }
      { this.props.currentView === "contact" &&
      <><TextField margin="dense" id="contactName" label="Name" value={this.props.contactName} variant="outlined"
        InputProps={{ style: { color: "#000000" } }} disabled={true} style={{ width: 260 }}/>
        <br />
        <TextField margin="dense" id="contactEmail" label="Email" value={this.props.contactEmail} variant="outlined"
          InputProps={{ style: { color: "#000000" } }} disabled={true} style={{ width: 520 }} />
          <br />
          <Button variant="contained" color="primary" size="small" style={{ marginTop: 10, marginRight: 10 }}
            onClick={() => this.onDelete()}>
          Delete
        </Button>
        <Button variant="contained" color="primary" size="small" style={{ marginTop: 10 }}
          onClick={() => this.props.composeMessage("CONTACT")}>
          Send Email
          </Button>
      </>
      }
  
    </form>
  
    )
  }
}

export default ContactView;
