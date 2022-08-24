import { ReturnType } from "@/src/ReturnType";
import { COOKIE_NAME } from "~~/Globals";
import { UserDataSource } from "../src/User";

export default defineEventHandler(async (evt): Promise<ReturnType> => {
    const body = await useBody(evt);
    const { email, password } = body;
    try {
        const token = await UserDataSource.login({ email, password });
        if (token) {
            setCookie(evt, COOKIE_NAME, token.token);
            console.log(token);
            return { response: "OK" };
        }
        return { error: "Incorrect Email or Password." };
    } catch (error) {
        return { error }
    }
});