import{SHOW_CONTACT,ADD_CONTACT,SAVE_CONTACT,DELETE_CONTACT,ADD_CONTACT_TO_LIST} from '../actionTypes';

import { InitialState } from './index';

export default function(state = InitialState, action) {
    switch (action.type) {

      case SHOW_CONTACT: {
        console.log("show contact",state.currentView)
        return {
          ...state,
          currentView:"contact",
          contactID:action.payload.contactID,
          contactName : action.payload.contactName,
          contactEmail : action.payload.contactEmail,

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
      case SAVE_CONTACT:{
        console.log("show contact",state.currentView)
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