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
    const [mapsApiKey, setMapsApiKey] = useState<string>("");

    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<number>(0); //0 - sem status,   1 - Ok,    2 - Erro


    const acaoSignup = async () => {
        try {
            const usuario : Usuario = { email: username, password };
            const tempToken = await signupUseCase( usuario );
            console.log("Response Body: ", tempToken);
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
            const responseBody = await signinUseCase( usuario );
            const mapAk = process.env.EXPO_PUBLIC_MAPSAPIKEY;
            console.log("Response Body: ", responseBody);
            console.log("Maps Api Key ==> ", mapAk);
            setMapsApiKey(mapAk);
            if (responseBody.token !== undefined) { 
                setToken( responseBody.token );
                console.log("Token: ", responseBody.token);
                setMessage("Usuario logado com sucesso");
                setStatus( 1 );
            } else { 
                throw new Error("Erro ao fazer o login ")
            }
            
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