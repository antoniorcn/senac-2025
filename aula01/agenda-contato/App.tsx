import React from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, TextInput } from 'react-native';


interface MeuBotaoProps { 
  descricao: string
}

const MeuBotao : React.FC<MeuBotaoProps> = ( props ) => { 
  return ( 
    <View style={{backgroundColor: "cornflowerblue",
          paddingHorizontal: 20, paddingVertical: 15,
          borderRadius: 15
        }}>
      <Text style={{color: "white", fontWeight: "bold",
        fontSize: 18
      }}>{props.descricao}</Text>
    </View>
  )
}

export default function App() {
  return (

    <View style={{flex: 1,
      flexDirection: "column",
      justifyContent: "space-evenly",
      padding: 20,
      backgroundColor: "yellow",
      borderRadius: 30}}> 
      <Text style={{
          flex: 1,
          fontSize: 32,
          fontWeight: "bold",
          fontFamily: "arial",
          backgroundColor: "lightcyan",
          textAlign: "center"
        }}>Agenda</Text>
      <View style={{flexDirection: "row",
        backgroundColor: "lightyellow",
        justifyContent: "space-between",
        flex: 1
      }}>
        <Text>Nome do contato:</Text>
        <TextInput style={{
          left: 100,
          top: 100,  backgroundColor: "lightcyan", 
          borderColor: "red", borderWidth: 2,
          borderRadius: 30}} />
      </View>
      <View style={{flexDirection: "row",
        backgroundColor: "lightyellow",
        justifyContent: "space-between",
        flex: 1
      }}>
        <Text>Nome do contato:</Text>
        <TextInput style={{
          left: 100,
          top: 100,  backgroundColor: "lightcyan", 
          borderColor: "red", borderWidth: 2,
          borderRadius: 30}} />
      </View>
      <View style={{flexDirection: "row",
        backgroundColor: "lightyellow",
        justifyContent: "space-between",
        flex: 1
      }}>
        <Text>Nome do contato:</Text>
        <TextInput style={{
          left: 100,
          top: 100,  backgroundColor: "lightcyan", 
          borderColor: "red", borderWidth: 2,
          borderRadius: 30}} />
      </View>
      <View style={{flex: 0.3, flexDirection: "row"}}>
        <MeuBotao descricao="Salvar"/>          
        <MeuBotao descricao="Pesquisar"/>                  
      </View>
    </View>
  );
}