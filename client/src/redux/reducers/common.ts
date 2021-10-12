import { InitialState } from './index';
export default function(state = InitialState, action) {
    switch (action.type) {
      case "TOGGLE_IS_ON": {
        return{
          ...state,
          isOn:!state.isOn,
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
    
      case "PLEASE_WAIT_VISIBLE":{
        // console.log(action.payload)
        return{
          ...state,
          isVisible:action.payload.inVisible,
        }
      }
      default:
        return state;
    }
  }
  