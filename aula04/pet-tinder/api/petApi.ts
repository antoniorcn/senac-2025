import axios, { AxiosResponse } from "axios";
import { Pet } from "../model/pet";

const api = axios.create({
    baseURL: "http://192.168.68.103:8080"
});

const carregarApi = async () : Promise<Pet[]> => { 
    const response = await api.get("/pets");
    console.log("Pets carregados");
    return response.data;
}

const apagarApi = async ( id : string ) : Promise<boolean> => {
    await api.delete(`/pets/${id}`);
    return true;
}

const salvarApi = async ( pet : Pet )=>{
    await api.post("/pets", {... pet, id : 0 })
    return true;
}

export {carregarApi, salvarApi, apagarApi};