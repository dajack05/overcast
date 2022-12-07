import { useUserStore } from "@/stores/user";
import type { Message } from "@ovc/common";
import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER_URL;

export class EmailService {
  static async SendText(
    text: string,
    subject: string,
    to: string
  ): Promise<string | undefined> {
    const userStore = useUserStore();

    try {
      const response = await axios.post(`${SERVER}/mail/custom`, {
        token: userStore.token,
        subject: subject,
        text: text,
        email: to,
      });

      const msg = response.data as Message<unknown>;
      if (msg.error) {
        return msg.error;
      }
    } catch (err: unknown) {
      return err as string;
    }
  }

  static async SendHTML(
    html: string,
    subject: string,
    to: string
  ): Promise<string | undefined> {
    const userStore = useUserStore();

    try {
      const response = await axios.post(`${SERVER}/mail/custom`, {
        token: userStore.token,
        subject: subject,
        html: html,
        email: to,
      });

      const msg = response.data as Message<unknown>;
      if (msg.error) {
        return msg.error;
      }
    } catch (err: unknown) {
      return err as string;
    }
  }
}
