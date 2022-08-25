import Jwt from "jsonwebtoken";
import { COOKIE_NAME } from "~~/Globals";

export default defineEventHandler(async (event) => {
  console.log("Starting Auth Middleware");
  if (event.req.headers.authentication) {
    console.log("Has auth header");
    try {
      const payload = Jwt.verify(
        event.req.headers.authentication as string,
        process.env.JWT_KEY
      );
      console.log(`payload`, payload);

      if (typeof payload !== "string") {
        event.context.auth = {
          id: payload.id,
        };
      }
    } catch (error) {
      if (error instanceof Jwt.TokenExpiredError) {
        // Token has expired
        event.context.error = error.message;
        event.context.auth = { id: undefined };
        deleteCookie(event, COOKIE_NAME);
      }
    }
  }
});
