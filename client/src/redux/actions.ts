import { Adb } from '@material-ui/icons';
import{SHOW_CONTACT,ADD_CONTACT,SAVE_CONTACT,DELETE_CONTACT,ADD_CONTACT_TO_LIST} from './actionTypes';
import * as Contacts from "../function/Contacts";


export interface contactMode {
    type:string,
    payload:{
        contactID?:string,
        contactName?:string,
        contactEmail?:string
        contact?:Contacts.IContact,
    }
}

export function toggleOn():contactMode{
    return{
        type:"TOGGLE_IS_ON",
        payload:{}
    }
}

export function showContact(inID: string, inName: string, inEmail: string): contactMode {
    return {
        type:SHOW_CONTACT,
        payload:{
            contactID:inID,
            contactName:inName,
            contactEmail:inEmail
        }
    }
  }

export function addContact():contactMode{
    return{
        type:ADD_CONTACT,
        payload:{
        }
    }
}

export function saveContact():contactMode{

    return{
        type:SAVE_CONTACT,
        payload:{
        }
    }
}
export function deleteContact():contactMode{
    
    return{
        type:DELETE_CONTACT,
        payload:{
        }
    }
}

export function addContactToList(inContact:Contacts.IContact):contactMode{
    return{
        type:ADD_CONTACT_TO_LIST,
        payload:{
            contact:inContact
        }
    }
}