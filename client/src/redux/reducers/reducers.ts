import{SHOW_CONTACT,ADD_CONTACT,SAVE_CONTACT,DELETE_CONTACT,ADD_CONTACT_TO_LIST, FIELD_CHANGE, ADD_MAILBOX_TO_LIST, COMPOSE_MESSAGE_NEW, COMPOSE_MESSAGE_REPLY, COMPOSE_MESSAGE_CONTACT, SET_CURRENT_MAILBOX, GET_MESSAGE, CLEAR_MESSAGES, SHOW_MESSAGE, SEND_MESSAGE, DELETE_MESSAGE, PLEASE_WAIT_VISIBLE, ADD_MESSAGE_TO_LIST} from '../actionTypes';
import * as Contacts from "../../function/Contacts";
import { config } from "../../constants/config";

import { Reducer } from 'redux';
import { MessageSharp } from '@material-ui/icons';

export const initialState = {
    isOn:false,
    isVisible:false,
    contacts : [ ],
    currentView : "welcome",
    contactID : null,
    contactName : null,
    contactEmail : null,
    messageID : null,
    messageDate : null,
    messageFrom : null,
    messageTo : null,
    messageSubject : null,
    messageBody : null,
    mailboxes : [ ],
    messages : [ ],
    currentMailbox : null,
};

export default function(state = initialState, action) {
    switch (action.type) {
      case "TOGGLE_IS_ON": {
        return{
          ...state,
          isOn:!state.isOn,
        }
      }
      case SHOW_CONTACT: {
        console.log("show contact",action.payload)
        return {
          ...state,
          currentView:"contact",
          contactID:action.payload.contactID,
          contactName : action.payload.contactName,
          contactEmail : action.payload.contactEmail,
        //   allIds: [...state.allIds, id],
        //   byIds: {
        //     ...state.byIds,
        //     [id]: {
        //       content,
        //       completed: false
        //     }
        //   }
        };
      }
      case ADD_CONTACT: {
        return {
          ...state,
          currentView:"contactAdd",
          contactID:null,
          contactName : "",
          contactEmail : "",
        };
      }
      case ADD_CONTACT_TO_LIST: {
        // console.log("contact",action.payload);
        const newContact = { _id : action.payload._id, name : action.payload.name, email : action.payload.email };
        return {
          ...state,
          contacts:[...state.contacts,newContact],
        };
      }
      case ADD_MAILBOX_TO_LIST:{
        // console.log("mail",action.payload);
        const newMailbox = {name:action.payload.name,path:action.payload.path};
        return {
          ...state,
          mailboxes:[...state.mailboxes,newMailbox],
        };
      }
      case ADD_MESSAGE_TO_LIST:{
        // console.log("mail",action.payload);
        const currMessage = { id : action.payload.id, date : action.payload.date, from : action.payload.from, subject : action.payload.subject };
        return{
          ...state,
          messages:[...state.messages,currMessage]
        }
      }

      case SAVE_CONTACT:{
        const newContact = action.payload;
        console.log("show contact",newContact)
        return{
            ...state,
            contacts:[...state.contacts,newContact],
            contactID:null,
            contactName : "",
            contactEmail : "",
          }
      }
      case DELETE_CONTACT:{
        return{
            ...state,
            contacts:state.contacts.filter((inElement) => inElement._id != state.contactID),
            contactID:null,
            contactName : "",
            contactEmail : "",
          }
      }
      case FIELD_CHANGE:{
        if(action.payload.fieldName==="contactEmail"){
          return{
            ...state,
            contactEmail : action.payload.contactEmail,
        }
        }else if(action.payload.fieldName==="contactName"){
          return{
            ...state,
            contactName : action.payload.contactName,
        }
        }
      }
      case COMPOSE_MESSAGE_NEW:{
        return{
          ...state,
          currentView:"compose",
          messageTo : "",
          messageSubject : "", 
          messageBody : "",
          messageFrom : config.userEmail,
        }
      }

      case COMPOSE_MESSAGE_REPLY:{
        return{
          ...state,
          currentView:"compose",
          messageTo : state.messageFrom,
          messageSubject : `Re: ${state.messageSubject}`, 
          messageBody : `\n\n---- Original Message ----\n\n${state.messageBody}`,
          messageFrom : config.userEmail,
        }

      }
      case COMPOSE_MESSAGE_CONTACT:{
        return{
          ...state,
          currentView:"compose",
          messageTo : state.contactEmail,
          messageSubject : "", 
          messageBody : "",
          messageFrom : config.userEmail,
        }
      }
      case SET_CURRENT_MAILBOX:{
        return{
          ...state,
          currentView : "welcome", 
          currentMailbox : action.payload.mailPath,
        }
      }
      case GET_MESSAGE:{
        return{
          ...state,
        }
      }

      case CLEAR_MESSAGES:{
        return{
          ...state,
          messages:[]
        }
      }
      case SHOW_MESSAGE:{
        console.log("SHOW_MESSAGE",action.payload.inMessage);
        return{
          ...state,
          currentView : "message",
          messageID : action.payload.inMessage.id,
          messageDate: action.payload.inMessage.date,
          messageFrom : action.payload.inMessage.from,
          messageTo: "",
          messageSubject: action.payload.inMessage.subject,
          messageBody: action.payload.mb,
        }
      }
      case SEND_MESSAGE:{
        return{
          ...state,
          currentView : "welcome",
        }
      }
      case DELETE_MESSAGE:{
        return{
          ...state,
          messages:state.messages.filter((inElement) => inElement._id != state.messageID),
          currentView : "welcome",
        }
      }
      case PLEASE_WAIT_VISIBLE:{
        console.log(action.payload)
        return{
          ...state,
          isVisible:action.payload.inVisible,
        }
      }
      default:
        return state;
    }
  }
  