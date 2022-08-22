export default defineEventHandler(async (evt) => {
    const body = await useBody(evt);
    const { email, password } = body;

    if (email === "daniel" && password === "asd") {
        return { result: "OK", error: undefined };
    }

    return { result: undefined, error: "NOT OK" };
});