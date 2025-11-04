import { ImagePickerAsset } from "expo-image-picker";
import { apagarApi, carregarApi, salvarApi, enviarImagemApi } from "../api/petApi"
import { Pet } from "../model/pet"

const salvar = async (pet : Pet) : Promise<boolean>=> {
    if (pet.nome == null || pet.nome.trim() == "") { 
        // erro avisan que o modelo não esta preenchido corretamente
        return false;
    } else { 
        return salvarApi( pet );
    }
}

const carregar = async () : Promise<Pet[]> => { 
    return carregarApi();
}

const apagar = async ( id : string ) : Promise<boolean> => { 
    return apagarApi( id );
}

const mandarImagem = async (id: number, asset : ImagePickerAsset ) => { 
    return enviarImagemApi( id, asset );
}

export { salvar, carregar, apagar, mandarImagem }