import { ReturnType } from "@/src/ReturnType";
import { UserDataSource } from "../src/User";

export default defineEventHandler(async (evt): Promise<ReturnType> => {
    const body = await useBody(evt);
    const { email, password, confirmPassword, dob, first_name, last_name, phone } = body;

    try {
        await UserDataSource.add({ email, password, confirmPassword, dob, first_name, last_name, phone });
        return { response: "OK" };
    } catch (error) {
        return { error };
    }
});