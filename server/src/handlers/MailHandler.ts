import { ERR, Message, OK, UserPermission } from "@ovc/common";
import { Request } from "express";
import { MailService } from "../services/MailService";
import { TokenManager } from "../Token";
import {email} from "../../email_templates/welcome.html";
import { UserService } from "../services/UserService";

export async function SendWelcomeEmail(req:Request): Promise<Message<boolean>>{
    const token = req.body.token as string;
    const email_address = req.body.email as string;

    if(!token || !email_address){
        return ERR("Missing Prarms");
    }

    const result = TokenManager.Verify(token);
    if(!result){
        return ERR("Bad Token");
    }

    if(result.permission_level !== UserPermission.ADMIN){
        return ERR("Insufficent Permission");
    }

    const user = await UserService.FindByEmail(email_address);
    if(user.error){
        return ERR(user.error);
    }
    
    if(!user.payload){
        return ERR("Failed to find user");
    }

    MailService.SendTemplatedEmail(email(user.payload), email_address);

    return OK(true);
}