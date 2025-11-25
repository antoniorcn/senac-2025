import { useState } from "react";
import { Usuario } from "../model/usuario";
import { signinUseCase, signupUseCase } from "../useCases/usuarioUseCases";


interface UsuarioControl { 
    username : string;
    password : string;

    message : string;
    status : number;
    setUsername : ( t : any )=>void;
    setPassword : ( t : any )=>void;

    acaoSignup : () => void;
    acaoSignin : () => void;
}

interface UsuarioControlProps { 
    token : string | null;
    setToken : ( t : any ) => void;
}


const useUsuarioControl = 
        ( {token, setToken} : UsuarioControlProps ) : UsuarioControl => {
        // ( usuarioControlProps : UsuarioControlProps ) : UsuarioControl => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<number>(0); //0 - sem status,   1 - Ok,    2 - Erro


    const acaoSignup = async () => {
        try {
            const usuario : Usuario = { email: username, password };
            const tempToken = await signupUseCase( usuario );
            setToken( tempToken );
            setMessage("Usuario logado com sucesso");
            setStatus( 1 );
        } catch ( error : any ) { 
            setMessage(`Erro ao registrar o usuário:  ${error.message}`);
            setStatus( 2 );
        }
    }

    const acaoSignin = async () => {
        try {
            const usuario : Usuario = { email: username, password };
            const tempToken = await signinUseCase( usuario );
            setToken( tempToken );
            setMessage("Usuario logado com sucesso");
            setStatus( 1 );
        } catch ( error : any ) { 
            setMessage(`Erro ao registrar o usuário:  ${error.message}`);
            setStatus( 2 );
        }
    }

    return {
        username, password, 
        setUsername, setPassword,
        acaoSignin, acaoSignup,
        message, status
    }

}

export { useUsuarioControl, UsuarioControl };