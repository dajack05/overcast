import Jwt, { JwtPayload } from "jsonwebtoken";
import { COOKIE_NAME } from "~~/Globals";

export default defineEventHandler(async (event) => {
  if (event.req.headers.authentication) {
    try {
      event.context.auth = {
        id: (
          Jwt.verify(
            event.req.headers.authentication as string,
            process.env.JWT_KEY
          ) as JwtPayload
        ).id,
      };
    } catch (error) {
      event.context.error = error;
      deleteCookie(event, COOKIE_NAME);
      event.res.writeHead(301, {'Location':"/"});
      event.res.end();
    }
  }
});
