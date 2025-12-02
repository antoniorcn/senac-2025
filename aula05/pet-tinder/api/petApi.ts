import axios, { AxiosResponse } from "axios";
import { Pet } from "../model/pet";
import { ImagePickerAsset } from "expo-image-picker";

const SERVER = "http://127.0.0.1:8080"; 

const api = axios.create({
    baseURL: SERVER
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

const enviarImagemApi = async (id: number, asset: ImagePickerAsset) : Promise<boolean> => {
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
            "Content-Type": "multipart/form-data"
        },
        body: formData
    });
    const data = await response.json();
    console.log("Data ==> ", data);
    return true;
}

export {carregarApi, salvarApi, apagarApi, enviarImagemApi};