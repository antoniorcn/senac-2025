import { useState } from "react";
import { Pet } from "../model/pet";
import { apagar, carregar, salvar } from "../useCases/petUseCases";



interface PetControl { 
    tipo : string;
    raca : string;
    nome : string;
    nascimento : string;
    peso : string;
    lista : Pet[];
    message : string;
    status : number;
    setTipo : ( t : any )=>void;
    setRaca : ( t : any )=>void;
    setNome : ( t : any )=>void;
    setNascimento : ( t : any )=>void;
    setPeso : ( t : any )=>void;
    setLista : ( t : any )=>void;
    acaoSalvar : () => void;
    acaoCarregar : () => void;
    acaoApagar : (id : string) => void;
}


const usePetControl = () : PetControl => {

    const [tipo, setTipo] = useState<string>("");
    const [raca, setRaca] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [nascimento, setNascimento] = useState<string>("");
    const [peso, setPeso] = useState<string>("0");

    const [lista, setLista] = useState<Array<any>>([
        {tipo : "Cachorro", raca: "Vira lata", nome: "Toto", nascimento: "2021-10-20", peso: 15}
    ]);

    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<number>(0); //0 - sem status,   1 - Ok,    2 - Erro


    const acaoSalvar = async () => {
        try {
            const pet : Pet = {nome, tipo, raca, 
                    nascimento, peso: parseFloat(peso)};
            await salvar( pet );
            setMessage("Pet salvo com sucesso");
            setStatus( 1 );
        } catch ( error : any ) { 
            setMessage(`Erro ao salvar o Pet: ${error.message}`);
            setStatus( 2 );
        }
    }

    const acaoCarregar = async () => {
        try {
            const pets = await carregar();
            setLista( pets );
            setMessage("Pets carregados com sucesso");
            setStatus( 1 );
        } catch ( error : any ) { 
            setMessage(`Erro ao carregar os Pets: ${error.message}`);
            setStatus( 2 );
        }
    }

    const acaoApagar = async (id : string) => {
        try {
            const response = await apagar( id );
            setMessage("Pet apagado com sucesso");
            setStatus( 1 );
        } catch ( error : any ) { 
            setMessage(`Erro ao apagar o Pet: ${error.message}`);
            setStatus( 2 );
        }
    }

    return {
        lista, setLista,
        nome, tipo, raca, nascimento, peso,
        setNome, setTipo, setRaca, setNascimento, setPeso,
        acaoSalvar, acaoCarregar, acaoApagar,
        message, status
    }

}

export { usePetControl, PetControl };