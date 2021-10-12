import axios, { AxiosResponse } from "axios";
import { config } from "../constants/config";
export interface IMailbox { name: string, path: string }

export interface IMessage {
  id: string,
  date: string,
  from: string,
  subject: string,
  body?: string
}


// The worker that will perform IMAP operations.
export class Worker {

  public async listMailboxes(): Promise<IMailbox[]> {

    console.log("IMAP.Worker.listMailboxes()");

    const response: AxiosResponse = await axios.get(`${config.serverAddress}/mailboxes`);
    return response.data;

  } /* End listMailboxes(). */


  public async listMessages(inMailbox: string): Promise<IMessage[]> {

    console.log("IMAP.Worker.listMessages()");

    const response: AxiosResponse = await axios.get(`${config.serverAddress}/mailboxes/${inMailbox}`);
    return response.data;

  } /* End listMessages(). */


  public async getMessageBody(inID: string, inMailbox: String): Promise<string> {

    console.log("IMAP.Worker.getMessageBody()", inID);

    const response: AxiosResponse = await axios.get(`${config.serverAddress}/messages/${inMailbox}/${inID}`);
    return response.data;

  } /* End getMessageBody(). */

  public async deleteMessage(inID: string, inMailbox: String): Promise<void> {

    console.log("IMAP.Worker.getMessageBody()", inID);

    await axios.delete(`${config.serverAddress}/messages/${inMailbox}/${inID}`);

  } /* End deleteMessage(). */


} /* End class. */
