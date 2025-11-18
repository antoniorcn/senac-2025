import axios from "axios";
import { SERVER } from "./config";
import { Usuario } from "../model/usuario";

const api = axios.create({
    baseURL: SERVER
});

const signup = async ( usuario : Usuario ) : Promise<string | null> => { 
    const response = await api.post("/auth/signup", usuario);
    console.log("Usuario registrado");
    return response.data;
}

const signin = async ( usuario : Usuario ) : Promise<string | null> => {
    // const response = await api.post("/auth/signin", usuario);
    // console.log("Usuario logado");
    // return response.data;
    return "ABC123ABC123token-validoABC123ABC123";
}

export {signin, signup};