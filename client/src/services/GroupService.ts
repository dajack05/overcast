import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER_URL;

export class GroupService{
    static async Create(name:string){
        const result = await axios.put(`${SERVER}/group`,{name});
    }
}