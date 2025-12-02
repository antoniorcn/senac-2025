import React, {useState} from 'react';
import { View, Text, TouchableHighlight, TextInput, Alert, StyleSheet, ToastAndroid, FlatList, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createDrawerNavigator } from '@react-navigation/drawer';
import axios, { AxiosResponse } from 'axios';

import {Entypo} from '@expo/vector-icons';

// const {Navigator, Screen} = createBottomTabNavigator();
const {Navigator, Screen} = createDrawerNavigator();

interface Pet { 
  tipo : string;
  raca : string;
  nome : string;
  nascimento : string;
  peso : number;
}

interface PetItemProps { 
  item : Pet;
  corFundo : string;
}

const Formulario : React.FC<any> = () => {
  const [tipo, setTipo] = useState<string>("");
  const [raca, setRaca] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [nascimento, setNascimento] = useState<string>("");
  const [peso, setPeso] = useState<number>(0);

  const [lista, setLista] = useState<Array<any>>([

    {tipo : "Cachorro", raca: "Vira lata", nome: "Toto", nascimento: "2021-10-20", peso: 15}

  ]);


  // const listaMostrar = [] 
  // for(let i = 0; i < lista.length; i++) {
  //   const obj = lista[i];
  //   listaMostrar.push(
  //       <PetItem  item={obj} corFundo="lightgray"/>
  //     );
  // }

  // const listaMostrar = lista.map( 
  //   (elemento)=><PetItem  item={elemento} corFundo="lightgray"/>
  // ) 


  // const numeros = [10, 32, 40, 3, 2, 80, 1];
  // const numerosQuadrados = numeros
  // .map( 
  //   ( num ) => { return num * num; }  
  // );

  const carregar = () => { 
    axios.get("http://localhost:8080/pets")
    .then( ( resposta )=>{
      setLista(resposta.data);
    })
    .catch( ( err )=>{ alert("Erro ao ler os pets " + err)});
  }


  const PetItem : React.FC<PetItemProps> = ( props : PetItemProps ) => {
  const {item, corFundo} = props;
  return ( 
    <View style={{backgroundColor: corFundo, borderColor: "red",
      borderWidth: 2, padding: 15, margin: 10, borderRadius: 20}}>
        <Text>{item.tipo}</Text>
        <Text>{item.raca}</Text>
        <Text>{item.nome}</Text>
        <Text>{item.nascimento}</Text>
        <Text>{item.peso}</Text>
        <Entypo name="trash" size={48} color="black" onPress={()=>{
          axios.delete(`http://localhost:8080/pets/${item.id}`)
          .then( ()=> {
            carregar();
          } )
          .catch( ()=>{
            alert("Erro ao apagar o registro");
          } )
        }}/>
      </View>
  );
}

  const [pagina, setPagina] = useState<string>("FORM");

  return (
    <NavigationContainer>
      <View style={estilos.container}>
        <Navigator>
          <Screen name="Formulario">
            { ( propsNavigation : any ) =>
            <View style={{flex: 1}}>
              <TextInput style={estilos.input}
                value={tipo} onChangeText={setTipo}
                placeholder="Tipo:"/>
              <TextInput style={estilos.input} 
                value={raca} onChangeText={setRaca}
                placeholder="Raça:"/>
              <TextInput style={estilos.input}
                value={nome} onChangeText={setNome}
                placeholder="Nome:"/>
              <TextInput style={estilos.input} 
                value={nascimento} onChangeText={setNascimento}
                placeholder="Nascimento:" />
              <TextInput style={estilos.input} keyboardType="number-pad"
                value={peso.toString()} onChangeText={(txt : string) => { 
                    setPeso(  parseInt(txt)   )
                }}
                placeholder="Peso:"/>          
              <TouchableHighlight onPress={()=>{
                axios.post("http://localhost:8080/pets", 
                  {id: 0, nome, tipo, raca, nascimento})
                .then( ( resposta : AxiosResponse<any, any> )=>{
                  console.log("Dados: " + resposta.data );
                  // Alert.alert("Pet", "Pet salvo com sucesso ", [
                  //   { text: "OK" }
                  // ]);
                  alert("Pet salvo com sucesso");
                })
                .catch( ( err : any )=>{
                  // Alert.alert("Pet", "Erro ao salvar o Pet " + err);
                  alert("Erro ao salvar o Pet");
                });
                // const obj = {tipo, raca, nome, nascimento, peso};
                // console.log( obj );

                // setLista( [ ...lista, obj ] );
                // Alert.alert("Pet", "Pet salvo com sucesso");
                // ToastAndroid.show("Pet Salvo com sucesso", ToastAndroid.LONG);

              } }>
                <View style={estilos.button}>
                  <Text style={estilos.buttonText}>Salvar</Text>
                </View>
              </TouchableHighlight>
            </View>
            }
          </Screen>
          <Screen name="Listagem">
            { ( propsNavigation : any ) =>
              <View style={{flex: 2}}>
                <Button title="Ler dados" onPress={()=>{
                    carregar();
                }}/>
                <FlatList data={lista} renderItem={PetItem} />
              </View>
            }

          </Screen>

        </Navigator>
      </View>
  </NavigationContainer>
  )
}

const estilos = StyleSheet.create({

  container : { 
    backgroundColor: "lightgray" ,
    margin: 25,
    flex: 1,
    padding: 5
  },
  buttonText: { 
    color: "white"
  },
  input: {
    backgroundColor: "lightcyan",
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    padding: 5
  },
  button : { 
    backgroundColor: "navy",
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 2,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: {width: 5, height: 5}

  }
});

export default Formulario;