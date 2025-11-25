import React, { useContext } from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import { estilos } from '../styles/commomStyles';
import { useUsuarioControl } from '../control/usuarioHook';
import { ContextoInfo, ContextoPrincipal } from '../context/Contexto';

// interface LoginViewProps { 
//     token : string | null;
//     setToken : ( t : any ) => void;
// }
interface LoginViewProps { 
}

// export const LoginView : React.FC<LoginViewProps> = ({token, setToken}) 
export const LoginView : React.FC<LoginViewProps> = () => {

  const {token, setToken} : ContextoInfo = useContext( ContextoPrincipal );

  const {
    username, password,
    setUsername, setPassword,
    acaoSignup, acaoSignin
  } = useUsuarioControl({token, setToken});

  return (
    <View style={{flex: 1}}>
      <TextInput style={estilos.input}
        value={username} onChangeText={setUsername}
        placeholder="Email do usuario"/>
      <TextInput style={estilos.input} 
        value={password} onChangeText={setPassword} secureTextEntry={true}
        placeholder="Senha com 6 digitos"/>
      <TouchableHighlight onPress={async ()=>acaoSignin()}>
        <View style={estilos.button}>
          <Text style={estilos.buttonText}>Fazer login</Text>
        </View>
      </TouchableHighlight>        
      <TouchableHighlight onPress={async ()=>acaoSignup()}>
        <View style={estilos.button}>
          <Text style={estilos.buttonText}>Fazer Registro</Text>
        </View>
      </TouchableHighlight>    
    </View>
  )
}