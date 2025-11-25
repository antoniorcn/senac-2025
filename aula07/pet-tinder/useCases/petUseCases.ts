import { ImagePickerAsset } from "expo-image-picker";
import { apagarApi, carregarApi, salvarApi, enviarImagemApi } from "../api/petApi"
import { Pet, PetSchema } from "../model/pet"

interface ErroCampo { 
    field : string;
    message? : string;
}

interface SalvarResponse { 
    status : number;
    message: string;
    errosCampos: ErroCampo[];
}

const salvar = async (pet : Pet) : Promise<SalvarResponse> => {
    // PetSchema.validate(pet)
    // .then( ()=>{} )
    // .catch( ()=>{} )
        // erro avisan que o modelo não esta preenchido corretamente

    try { 
        const validacao = await PetSchema.validate(pet, {abortEarly: false});
        let salvarStatus = false;
        if (validacao) { 
            salvarStatus = await salvarApi( pet );
        }
        const resposta : SalvarResponse = {
            status : salvarStatus ? 1 : 2,
            message: salvarStatus ? "Salvo com sucesso" : 
                                    "Erro ao salvar o Pet",
            errosCampos: []
        }
        return resposta;        
    } catch ( err : any ) {
        const resposta : SalvarResponse = {
            status : 2,
            message: err.message,
            errosCampos: err.inner.map( (e : any) => 
                ({field: e.path, message: e.message}) )
        }
        
        return resposta;
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

export { SalvarResponse, ErroCampo, salvar, carregar, apagar, mandarImagem }