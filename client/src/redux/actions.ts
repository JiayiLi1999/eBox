import { Adb } from '@material-ui/icons';
import{SHOW_CONTACT,ADD_CONTACT,SAVE_CONTACT,DELETE_CONTACT,ADD_CONTACT_TO_LIST, FIELD_CHANGE, ADD_MAILBOX_TO_LIST, COMPOSE_MESSAGE_NEW, COMPOSE_MESSAGE_REPLY, COMPOSE_MESSAGE_CONTACT, SET_CURRENT_MAILBOX, GET_MESSAGE, CLEAR_MESSAGES, SHOW_MESSAGE, SEND_MESSAGE, DELETE_MESSAGE, PLEASE_WAIT_VISIBLE, ADD_MESSAGE_TO_LIST} from './actionTypes';
import * as Contacts from "../function/Contacts";
import * as IMAP from "../function/IMAP";
import * as SMTP from "../function/SMTP";


export interface contactMode {
    type:string,
    payload:{
        contactID?:string,
        contactName?:string,
        contactEmail?:string
        contact?:Contacts.IContact,
        mailbox?:IMAP.IMailbox,
        mailPath?:string,
        mailMessages?:IMAP.IMessage[],
        mailMessage?:IMAP.IMessage,
        messageBody?:string,
        inVisible?:boolean,
    }
}
interface fieldChangerMode{
    type:string,
    payload:{
        fieldName:string,
        fieldValue:string
    }
}


export function fieldChangeHandler(fieldName:string,fieldValue:string):fieldChangerMode{
    return{
        type:"FIELD_CHANGE",
        payload:{
            fieldName:fieldName,
            fieldValue:fieldValue
        }
    }
}

export function toggleOn():contactMode{
    return{
        type:"TOGGLE_IS_ON",
        payload:{}
    }
}

export function composeMessage(inType:string):contactMode{
    switch (inType) {

        case "new":
            return{
                type:COMPOSE_MESSAGE_NEW,
                payload:{}
            }
        case "reply":
            return{
                type:COMPOSE_MESSAGE_REPLY,
                payload:{}
            }

        case "contact":
            return{
                type:COMPOSE_MESSAGE_CONTACT,
                payload:{}
            }

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

export function addMailboxToList(inMailbox: IMAP.IMailbox):contactMode{
    return{
        type:ADD_MAILBOX_TO_LIST,
        payload:{
            mailbox:inMailbox,
        }
    }
}
export function addMessageToList(inMessage: IMAP.IMessage):contactMode{
    return{
        type:ADD_MESSAGE_TO_LIST,
        payload:{
            mailMessage:inMessage,
        }
    }
}

export function setCurrentMailbox(inPath: string):contactMode{
    return{
        type:SET_CURRENT_MAILBOX,
        payload:{
            mailPath:inPath,
        }
    }
}

export function getMessage(messages: IMAP.IMessage[]):contactMode{
    return{
        type:GET_MESSAGE,
        payload:{
            mailMessages:messages,
        }
    }
}

export function clearMessages (): contactMode {
    return{
        type:CLEAR_MESSAGES,
        payload:{
            
        }
    }
}

export function showMessage(inMessage: IMAP.IMessage,mb: string):contactMode{
    return{
        type:SHOW_MESSAGE,
        payload:{
            mailMessage:inMessage,
            messageBody: mb,
        }
    }
}

export function sendMessage():contactMode{
    return{
        type:SEND_MESSAGE,
        payload:{}
    }
}

export function deleteMessage():contactMode{
    return{
        type:DELETE_MESSAGE,
        payload:{}
    }
}

export function pleaseWaitVisible(inVisible: boolean):contactMode{
    return{
        type:PLEASE_WAIT_VISIBLE,
        payload:{inVisible}
    }
}