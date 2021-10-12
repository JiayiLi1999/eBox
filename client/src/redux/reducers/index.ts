import { combineReducers } from "redux";
import commonReducers from "./common";
import messageReducers from "./message";
import contactReducers from "./contacts";
import reducers from "./reducers";

export const InitialState = {
    isOn:false,
    isVisible:false,
    currentView : "welcome",
    contacts : [ ],
    contactID : null,
    contactName : null,
    contactEmail : null,
    messageID : null,
    messageDate : null,
    messageFrom : null,
    messageTo : null,
    messageSubject : null,
    messageBody : null,
    messages : [ ],
    mailboxes : [ ],
};

// const rootReducer = combineReducers({
//     common: commonReducers,
//     message:messageReducers,
//     contact:contactReducers,
//   });

// export default rootReducer
// export type RootState = ReturnType<typeof rootReducer>;

export default reducers;
