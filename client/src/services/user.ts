import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER_URL;

export class UserService{
    static async Register(email:string, password:string, dob:string){
        const response = await axios.post(`${SERVER}/user`,{
            email:email,
            password:password,
            dob:dob,
        });

        console.log(response);
    }
}