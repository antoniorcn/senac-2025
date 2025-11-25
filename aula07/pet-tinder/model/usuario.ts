import {object, string, InferType} from 'yup';

const UsuarioSchema = object({ 
    email : string().required().trim().email(),
    password : string().required().trim().min(6)
});

type Usuario = InferType<typeof UsuarioSchema>;

export {Usuario, UsuarioSchema}