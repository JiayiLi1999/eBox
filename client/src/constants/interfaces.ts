import * as Contacts from "../function/Contacts";
import * as IMAP from "../function/IMAP";
import * as SMTP from "../function/SMTP";
import * as ActionTypes from "../redux/actionTypes";

export interface Contact{ 
    _id : string,
    name : string,
    email : string 
  }
  
  export interface IContactView{ currentView ?: string, contactID ?: string, contactName ?: string, contactEmail ?: string }
  export interface fieldChanger{ fieldName:string,fieldValue:string}
  
  export interface DispatchProps {
    addContactToList?:(inContact:Contacts.IContact)=>void;
    addMailboxToList?:(inMailbox: IMAP.IMailbox)=>void;
    addMessageToList?:(inMessage: IMAP.IMessage)=>void;
    showContact?:(inContact:IContactView)=>void;
    saveContact?:(inContact:Contacts.IContact)=>void;
    deleteContact?:()=>void;
    // fieldChangeHandler?:(field:fieldChanger)=>void;
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

  export interface mainInterface {
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

  export const mapState = (state: mainInterface) => ({
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
  
  export const mapDispatch = {
    // showContact:(id,name,email) => ({inID: id, inName:name, inEmail:email}),
    setCurrentMailbox:(inPath)=>({type: ActionTypes.SET_CURRENT_MAILBOX,payload:inPath}),
    addContactToList:(inContact) => ({type: ActionTypes.ADD_CONTACT_TO_LIST,payload:inContact}),
    addMailboxToList:(inMailbox)=>({type: ActionTypes.ADD_MAILBOX_TO_LIST,payload:inMailbox}),
    addMessageToList:(inMessage: IMAP.IMessage)=>({type: ActionTypes.ADD_MESSAGE_TO_LIST,payload:inMessage}),

    showContact:(inContact:IContactView)=>({type: ActionTypes.SHOW_CONTACT,payload:inContact}),
    saveContact:(inContact:Contacts.IContact)=>({type: ActionTypes.SAVE_CONTACT,payload:inContact}),
    deleteContact:()=>({type: ActionTypes.DELETE_CONTACT,payload:{}}),    
    addContact:()=>({type: ActionTypes.ADD_CONTACT,payload:{}}),
    
    getMessage:(messages)=>({type: ActionTypes.GET_MESSAGE,payload:messages}),
    clearMessages:()=>({type: ActionTypes.CLEAR_MESSAGES,payload:{}}),
    showMessage:(inMessage: IMAP.IMessage,mb: string)=>({type: ActionTypes.SHOW_MESSAGE,payload:{inMessage,mb}}),
    sendMessage:()=>({type: ActionTypes.SEND_MESSAGE,payload:{}}),
    deleteMessage:()=>({type: ActionTypes.DELETE_MESSAGE,payload:{}}),
    composeMessage:(inType:string)=>({type: ActionTypes.COMPOSE_MESSAGE+"_"+inType,payload:{}}),

    pleaseWaitVisible:(inVisible)=>({type: ActionTypes.PLEASE_WAIT_VISIBLE,payload:{inVisible}}),
    // fieldChangeHandler:(field)=>({type: ActionTypes.FIELD_CHANGE,payload:field}),
    
  }

  export type Props =  mainInterface & DispatchProps;
