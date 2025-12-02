import axios from "axios";
import { SERVER } from "./config";
import { Place } from "../model/place";

const api = axios.create({
    baseURL: SERVER
});

const retrievePlacesApi = async () : Promise<Place[]> => { 
    const response = await api.get("/places");
    console.log("Locais carregados");
    return response.data;
}

export {retrievePlacesApi};