// React imports.
import React from "react";

// Material-UI imports.
import Button from "@material-ui/core/Button";
import NewContactIcon from "@material-ui/icons/ContactMail";
import NewMessageIcon from "@material-ui/icons/Email";

import {Props} from "../constants/interfaces";

/**
 * Toolbar.
 */
const Toolbar = (props:Props) => (

  <div>
    <Button variant="contained" color="primary" size="small" style={{ marginRight:10 }}
      onClick={ () => props.composeMessage("NEW") } >
      <NewMessageIcon style={{ marginRight:10 }} />New Message
    </Button>
    <Button variant="contained" color="primary" size="small" style={{ marginRight:10 }}
      onClick={ props.addContact } >
      <NewContactIcon style={{ marginRight:10 }} />New Contact
    </Button>
  </div>

);


export default Toolbar;
