import { apagarApi, carregarApi, salvarApi } from "../api/petApi"
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

export { salvar, carregar, apagar }