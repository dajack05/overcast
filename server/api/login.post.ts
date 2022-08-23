import { ReturnType } from "@/src/ReturnType";
import { COOKIE_NAME } from "~~/Globals";
import { UserDataSource } from "../src/User";

export default defineEventHandler(async (evt): Promise<ReturnType> => {
    const body = await useBody(evt);
    const { email, password } = body;
    try {
        const user = await UserDataSource.login({ email, password });
        if (user) {
            setCookie(evt, COOKIE_NAME, JSON.stringify(user));
            return { response: "OK" };
        }
        return { error: "Incorrect Email or Password." };
    } catch (error) {
        return { error }
    }
});