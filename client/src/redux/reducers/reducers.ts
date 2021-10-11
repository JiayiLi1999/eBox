import{SHOW_CONTACT,ADD_CONTACT,SAVE_CONTACT,DELETE_CONTACT,ADD_CONTACT_TO_LIST} from '../actionTypes';
import * as Contacts from "../../function/Contacts";

import { Reducer } from 'redux';

const initialState = {
    isOn:false,
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
        console.log("contact",action.payload);
        const newContact = { _id : action.payload._id, name : action.payload.name, email : action.payload.email };
        return {
          ...state,
          contacts:[...state.contacts,newContact],
        };
      }
      case SAVE_CONTACT:{
        const newContact = { _id : state.contactID, name : state.contactName, email : state.contactEmail };
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
      default:
        return state;
    }
  }
  