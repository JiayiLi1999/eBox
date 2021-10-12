import axios from "axios";
import { config } from "../constants/config";


// The worker that will perform SMTP operations.
export class Worker {

  public async sendMessage(inTo: string, inFrom: string, inSubject: string, inMessage: string): Promise<void> {

    console.log("SMTP.Worker.sendMessage()");

    await axios.post(`${config.serverAddress}/messages`, { to : inTo, from : inFrom, subject : inSubject,
      text : inMessage
    });

  } /* End sendMessage(). */


} /* End class. */
