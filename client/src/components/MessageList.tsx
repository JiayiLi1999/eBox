// React imports.
import React from "react";


import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import * as IMAP from "../function/IMAP";

import {Props} from "./BaseLayout";

/**
 * MessageList.
 */

var index = 0;

const ClickMessage = async (props:Props,message:IMAP.IMessage) => {
  props.pleaseWaitVisible(true);
  const imapWorker: IMAP.Worker = new IMAP.Worker();
  const mb: string = await imapWorker.getMessageBody(message.id, props.currentMailbox);
  props.pleaseWaitVisible(false);
  props.showMessage(message,mb);
}

const MessageList = (props:Props) => (

  <Table stickyHeader padding="none">
    <TableHead>
      <TableRow>
        <TableCell style={{ width:120 }}>Date</TableCell>
        <TableCell style={{ width:300 }}>From</TableCell>
        <TableCell>Subject</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      { props.messages && props.messages.map(message => (
        <TableRow key={ index++ } onClick={()=>ClickMessage(props,message)}>
          <TableCell>{ new Date(message.date).toLocaleDateString() }</TableCell>
          <TableCell>{ message.from }</TableCell>
          <TableCell>{ message.subject }</TableCell>
        </TableRow>
      ) ) }
    </TableBody>
  </Table>

); /* Mailboxes. */


export default MessageList;
