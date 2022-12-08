import { Groups, Users } from ".prisma/client";

export const WelcomeEmailTemplate = (user: Users, group:Groups) => `
<div style="width: 100%; background-color: #566c86 padding: 2rem;">
  <div style="border-radius: 5px; border: 1px solid #1a1c2c; width: 100%; margin:auto; max-width: 500px; background-color: #f4f4f4; padding: 10px;">
    <h1>Welcome To Overcast!</h1>
    <hr />
    <p>Hi ${user.first_name},</p>
    <p>You've been registered as a member of ${group.name}.</p>
    <p>Don't worry if you have no idea what this is all about. <b>There's nothing you need to do!</b></p>
    <p>Overcast is a platform meant to help ${group.name} track things like when you need a new BFR or medical.</p>
    <p>If you want to create an account, use <a href="http://127.0.0.1:5173/user">this link</a> to set one up. An account will let you see your own information and update it when needed.</p>
    <p>Otherwise, feel free to ignore this email, but keep an eye out for friendly reminders when you're nearing your BFR or Medical due dates.</p>
    <p>
      Thanks!<br />
      <b>Admin @ Overcast</b>
    </p>
  </div>
</div>
`;
