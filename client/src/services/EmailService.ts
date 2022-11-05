import axios from 'axios';

const SERVER = import.meta.env.VITE_SERVER_URL;

export class EmailService {
  static async SendTestEmail(address:string): Promise<string|undefined>{
    await axios.get(`${SERVER}/mail/send`,{
      params:{
        to:address,
      }
    });
    return "Sorry Mario, the princess is in another castle.";
  }
}