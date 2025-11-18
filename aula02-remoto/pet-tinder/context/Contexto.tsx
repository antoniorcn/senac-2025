import { createContext } from "react";


export interface ContextoInfo { 
    token : string | null;
    setToken : (t : any ) => void;
}


export const contextoVazio : ContextoInfo = { 
    token : null, 
    setToken : (t : any)=>{}
}

export const ContextoPrincipal = createContext( contextoVazio );

