import { Users } from ".prisma/client";

export const email = (user:Users)=>`
<h1>Welcome To Overcast!</h1>
<p>Hi ${user.first_name},</p>
<p>You've been registered and you're almost done.</p>
<p>Please click <a href="http://localhost:8080/user" style="color: #002200; background-color: #00ff22; padding: 8px 12px; border-radius: 5px; text-decoration: none;">this link</a> to confirm your account and set a password.</p>
`;