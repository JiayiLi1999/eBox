import { config } from "../../constants/config";
import { InitialState } from './index';

export default function(state = InitialState, action) {
    switch (action.type) {
      case "ADD_MAILBOX_TO_LIST":{
        // console.log("mail",action.payload);
        const newMailbox = {name:action.payload.name,path:action.payload.path};
        return {
          ...state,
          mailboxes:[...state.mailboxes,newMailbox],
        };
      }
      case "ADD_MESSAGE_TO_LIST":{
        // console.log("mail",action.payload);
        const currMessage = { id : action.payload.id, date : action.payload.date, from : action.payload.from, subject : action.payload.subject };
        return{
          ...state,
          messages:[...state.messages,currMessage]
        }
      }
      case "FIELD_CHANGE":{
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
      case "COMPOSE_MESSAGE_NEW":{
        return{
          ...state,
          currentView:"compose",
          messageTo : "",
          messageSubject : "", 
          messageBody : "",
          messageFrom : config.userEmail,
        }
      }

      case "COMPOSE_MESSAGE_REPLY":{
        return{
          ...state,
          currentView:"compose",
          messageTo : state.messageFrom,
          messageSubject : `Re: ${state.messageSubject}`, 
          messageBody : `\n\n---- Original Message ----\n\n${state.messageBody}`,
          messageFrom : config.userEmail,
        }

      }
      case "COMPOSE_MESSAGE_CONTACT":{
        return{
          ...state,
          currentView:"compose",
          messageTo : state.contactEmail,
          messageSubject : "", 
          messageBody : "",
          messageFrom : config.userEmail,
        }
      }
      case "SET_CURRENT_MAILBOX":{
        return{
          ...state,
          currentView : "welcome", 
          currentMailbox : action.payload.mailPath,
        }
      }
      case "GET_MESSAGE":{
        return{
          ...state,
        }
      }

      case "CLEAR_MESSAGES":{
        return{
          ...state,
          messages:[]
        }
      }
      case "SHOW_MESSAGE":{
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
      case "SEND_MESSAGE":{
        return{
          ...state,
          currentView : "welcome",
        }
      }
      case "DELETE_MESSAGE":{
        return{
          ...state,
          messages:state.messages.filter((inElement) => inElement._id != state.messageID),
          currentView : "welcome",
        }
      }
      case "PLEASE_WAIT_VISIBLE":{
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
  