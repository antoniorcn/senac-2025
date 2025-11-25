import { ImagePickerAsset } from "expo-image-picker";
import { signin, signup } from "../api/usuarioApi";
import { Usuario, UsuarioSchema } from "../model/usuario";

const signinUseCase = async (usuario : Usuario) : Promise<string | null>=> {
    try { 
        const usuarioValidado = await UsuarioSchema.validate( usuario );
        return await signin( usuarioValidado );
    } catch( err ) { 
        console.error(err);
        return null;
    }

}

const signupUseCase = async (usuario : Usuario) : Promise<string | null>=> {
    try { 
        const usuarioValidado = await UsuarioSchema.validate( usuario );
        return await signup( usuarioValidado );
    } catch( err ) { 
        console.error(err);
        return null;
    }

}
export { signupUseCase, signinUseCase }