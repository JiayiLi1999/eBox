// React imports.
import React from "react";

// Material-UI imports.
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Person from "@material-ui/icons/Person";
import Button from '@material-ui/core/Button';
import ListItemText from "@material-ui/core/ListItemText";
import { connect, ConnectedProps, useSelector } from "react-redux";

import {Props} from "./BaseLayout";

/**
 * Contacts.
 */
const onClick = (props,value) => {
  console.log("click!");
  console.log(value._id,value.name);
  props.showContact({contactID : value._id, contactName : value.name, contactEmail : value.email});
}

const ContactList = (props:Props) => (
  <List>
    {props.contacts.map(value => {
      return (
        <ListItem key={value._id}>
          <ListItemAvatar>
          <Avatar>
            <Person />
          </Avatar>
          </ListItemAvatar>
          <Button onClick={()=>onClick(props,value)}>
          <ListItemText primary={ `${value.name}` } />
          </Button>
        </ListItem>
      );
    })}
  </List>
); /* End Contacts. */




export default ContactList;
