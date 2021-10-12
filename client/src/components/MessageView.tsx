// React imports.
import React from "react";
import { InputBase } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {Props} from "../constants/interfaces";
import * as IMAP from "../function/IMAP";
import * as SMTP from "../function/SMTP";
import {config} from "../constants/config";
/**
 * MessageView.
 */

interface States{
  to:string,
  subject:string,
  body:string
}

class MessageView extends React.Component<Props,States>{
  constructor(props){
    super(props);
    this.state={
      to:"",
      subject:"",
      body:""
    }
    this.onDeleteMessage.bind(this);
    this.onSendMessage.bind(this);
  }

  async onDeleteMessage(){
    this.props.pleaseWaitVisible(true);
    const imapWorker: IMAP.Worker = new IMAP.Worker();
    await imapWorker.deleteMessage(this.props.messageID, this.props.currentMailbox).then(()=>{this.props.pleaseWaitVisible(false);});
    this.props.deleteMessage();
  }

  async onSendMessage(){
    this.props.pleaseWaitVisible(true);
    const smtpWorker: SMTP.Worker = new SMTP.Worker();
    await smtpWorker.sendMessage(this.state.to, config.userEmail, this.state.subject,this.state.body).then(()=>{this.props.pleaseWaitVisible(false);});
    this.props.sendMessage();
  }

  render(){
    console.log("message view props",this.props);
  return(
    <form>
    { this.props.currentView === "message" && 
    <div>
      <InputBase defaultValue={ `ID ${this.props.messageID}` } margin="dense" disabled={ true } fullWidth={ true }
        className="messageInfoField" /><br />
        <InputBase defaultValue={ this.props.messageDate } margin="dense" disabled={ true } fullWidth={ true }
        className="messageInfoField" /><br />
        <TextField margin="dense" variant="outlined" fullWidth={ true } label="From" value={ this.props.messageFrom }
        disabled={ true } InputProps={{ style : { color : "#000000" } }} /><br />
        <TextField margin="dense" id="messageTo" variant="outlined" fullWidth={ true } label="To"
        value={ this.props.messageTo } InputProps={{ style : { color : "#000000" } }}
        /><br />
        <TextField margin="dense" id="messageSubject" label="Subject" variant="outlined" fullWidth={ true }
      value={ this.props.messageSubject } disabled={true }
      InputProps={{ style : { color : "#000000" } }} 
      /><br />
        <TextField margin="dense" id="messageBody" variant="outlined" fullWidth={ true } multiline={ true } rows={ 12 }
      value={ this.props.messageBody} disabled={ true }
      InputProps={{ style : { color : "#000000" } }} 
      /><br />
    </div> 
    }
    { this.props.currentView === "compose" && 
    <div>
      <TextField margin="dense" id="messageTo" variant="outlined" fullWidth={ true } label="To"
        value={ this.state.to } InputProps={{ style : { color : "#000000" } }}
        onChange={(Event)=> this.setState({to:Event.target.value})} 
        />
      <TextField margin="dense" id="messageSubject" label="Subject" variant="outlined" fullWidth={ true }
        value={ this.state.subject } disabled={ false }
        InputProps={{ style : { color : "#000000" } }} 
        onChange={(Event)=> this.setState({subject:Event.target.value})} 
        />
      <br />
      <TextField margin="dense" id="messageBody" variant="outlined" fullWidth={ true } multiline={ true } rows={ 12 }
        value={ this.state.body } disabled={ false }
        InputProps={{ style : { color : "#000000" } }} 
        onChange={(Event)=> this.setState({body:Event.target.value})} 
        />
    </div> 
    }

    { /* ----- Buttons. ----- */ }

    { this.props.currentView === "compose" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10 }}
        onClick={()=>this.onSendMessage()}
        >
      Send
    </Button>
    }
    { this.props.currentView === "message" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10, marginRight:10 }}
        onClick={ () => this.props.composeMessage("REPLY") }>
        Reply
      </Button>
    }
    { this.props.currentView === "message" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10 }}
        onClick={() => this.onDeleteMessage() }
        >
        Delete
      </Button>
    }

  </form>
  
  )}
}


export default MessageView;
