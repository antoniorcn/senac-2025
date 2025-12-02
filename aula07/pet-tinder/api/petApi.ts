import axios from "axios";
import { Pet } from "../model/pet";
import { ImagePickerAsset } from "expo-image-picker";
import { SERVER } from "./config";

const api = axios.create({
    baseURL: SERVER
});

const carregarApi = async (token : string) : Promise<Pet[]> => { 
    const response = await api.get("/pets", 
        {headers: {Authorization: "Bearer " + token}}
    );
    console.log("Pets carregados");
    return response.data;
}

const apagarApi = async (token : string, id : string ) : Promise<boolean> => {
    await api.delete(`/pets/${id}`, 
        {headers: {Authorization: "Bearer " + token}}
    );
    return true;
}

const salvarApi = async (token : string, pet : Pet )=>{
    await api.post("/pets", {... pet, id : 0 }, 
        {headers: {Authorization: "Bearer " + token}}
    );
    return true;
}

const enviarImagemApi = async (token : string, id: number, asset: ImagePickerAsset) : Promise<boolean> => {
    const formData = new FormData();
    formData.append("imagem", {
        uri: asset.uri,
        type: "image/webp",
        name: "foto.webp"
    } as any);
    console.log("Form Data definido ==> ", formData);
    const response = await fetch(SERVER + `/pets/upload/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + token
        },
        body: formData
    });
    const data = await response.json();
    console.log("Data ==> ", data);
    return true;
}

export {carregarApi, salvarApi, apagarApi, enviarImagemApi};