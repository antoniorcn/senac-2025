import React, {useState} from 'react';
import { View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { estilos } from './styles/commomStyles';
import PetView from './screens/PetView';
import { LoginView } from './screens/LoginView';
import { ContextoPrincipal } from './context/Contexto';

const Principal : React.FC<any> = () => {
  const [token, setToken] = useState<string | null>(null);
  /* return ( <NavigationContainer>
      //   <View style={estilos.container}>
      //     { token ? 
      //       (<PetView/>) :
      //       (<LoginView token={token} setToken={setToken}/>)
      //     }
      //   </View>
      // </NavigationContainer>) */
  return(
    <ContextoPrincipal.Provider value={{token, setToken}}>
      <NavigationContainer>
        <View style={estilos.container}>
          { token ? 
            (<PetView/>) :
            (<LoginView/>)
          }
        </View>
      </NavigationContainer>
    </ContextoPrincipal.Provider>
  )
}
 

export default Principal;