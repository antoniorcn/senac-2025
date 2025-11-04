import React, {ReactNode, useState} from 'react';
import { Image, View, Text, TouchableHighlight, TextInput, Alert, StyleSheet, ToastAndroid, FlatList, Button, ListRenderItemInfo } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Entypo} from '@expo/vector-icons';
import {launchImageLibraryAsync, requestMediaLibraryPermissionsAsync} from "expo-image-picker"; 
import { PetControl, usePetControl } from './control/petHook';
import { Pet } from './model/pet';

const {Navigator, Screen} = createBottomTabNavigator();

interface PetItemProps extends ListRenderItemInfo<Pet> {
  onApagar : ( id : string ) => void;
}

const PetView : React.FC<any> = () => {
  const petControl : PetControl = usePetControl();
  const {message, status} = petControl;
  const textColor = status == 2? "red" : "green";
  return(
    <NavigationContainer>
      <View style={estilos.container}>
        {(status != 0) && (<Text style={{color: textColor}}>{message}</Text>)}
        <Navigator>
          <Screen name="Formulario" options={{
              title: "Form",
              tabBarIcon : ( iconsProps : {focused : boolean, 
                color: string, size: number} ) : ReactNode => { 
                  return (<Entypo name="new-message" 
                      color={iconsProps.color} size={iconsProps.size}/>);
              },
          }}>
            { ( propsNavigation : any ) => <Formulario {...propsNavigation} petControl={petControl}/> }
          </Screen>
          <Screen name="Listagem" options={{
              title: "List",
              tabBarIcon : ( iconsProps : {focused : boolean, 
                color: string, size: number} ) : ReactNode => { 
                  return (<Entypo name="list" 
                      color={iconsProps.color} size={iconsProps.size}/>);
              },
            }}>
              { ( propsNavigation : any ) => <Listagem {...propsNavigation} petControl={petControl}/> }
          </Screen>
          <Screen name="Matches" options={{
              title: "Matches",
              tabBarIcon : ( iconsProps : {focused : boolean, 
                color: string, size: number} ) : ReactNode => { 
                  return (<Entypo name="heart" 
                      color={iconsProps.color} size={iconsProps.size}/>);
              },
            }}>
              { ( propsNavigation : any ) => <Matches {...propsNavigation} petControl={petControl}/> }
          </Screen>
        </Navigator>
      </View>
    </NavigationContainer>
  )
}

const PetItem : React.FC<PetItemProps> = ( props : PetItemProps ) => {
  const {item, onApagar} = props;
  return ( 
    <View style={{backgroundColor: "lightcyan", borderColor: "red",
      borderWidth: 2, padding: 15, margin: 10, borderRadius: 20}}>
        <Text>{item.tipo}</Text>
        <Text>{item.raca}</Text>
        <Text>{item.nome}</Text>
        <Text>{item.nascimento}</Text>
        <Text>{item.peso}</Text>
        <Entypo name="trash" size={48} color="black" onPress={async ()=>{
            if (item.id) {
              onApagar( String(item.id) );
            }
        }}/>
      </View>
  );
}

const Formulario : React.FC<any> = (propsNavigation) => {
  const {
    nome, tipo, raca, nascimento, peso, imagem,
    setNome, setTipo, setRaca, setNascimento, setPeso,
    acaoSalvar, acaoCarregarImagem
  } = propsNavigation.petControl;

  return (
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
        value={peso} onChangeText={setPeso}
        placeholder="Peso:"/>
      <Button title="Carregar Imagem" onPress={async ()=>acaoCarregarImagem()} />     
      <TouchableHighlight onPress={async ()=>acaoSalvar()}>
        <View style={estilos.button}>
          <Text style={estilos.buttonText}>Salvar</Text>
        </View>
      </TouchableHighlight>
      <Image source={{uri: imagem}} style={{flex: 1}}/>
    </View>
  )
}

const Listagem : React.FC<any> = ( propsNavigation ) => {
  const {
    lista, acaoCarregar, acaoApagar
  } = propsNavigation.petControl;

  return (
    <View style={{flex: 2}}>
      <Button title="Ler dados" onPress={async ()=>acaoCarregar()}/>
      <FlatList data={lista} renderItem={( itemProps : ListRenderItemInfo<Pet> )=>
        <PetItem {...itemProps} onApagar={acaoApagar}/>} />
    </View>
  )
}

const Matches : React.FC<any> = ( propsNavigation ) => {
  const {
    lista, acaoCarregar, acaoApagar
  } = propsNavigation.petControl;

  const [petIndice, setPetIndice] = useState<number>(0);
  const [petAtual, setPetAtual] = useState<Pet|null >( lista[petIndice] );

  return (
    <View style={{flex: 2}}>
      <Button disabled={petAtual == null} title="Proximo" onPress={async ()=>{
        console.log(lista);
        let petIndiceNovo = petIndice + 1;
        console.log("PetIndiceNovo ==> ", petIndiceNovo);
        if (petIndiceNovo > lista.length) { 
          petIndiceNovo = 0;
        }
        console.log("lista[petIndiceNovo] ==> ", lista[petIndiceNovo]);
        setPetAtual(lista[petIndiceNovo]);
        setPetIndice(petIndiceNovo);
      }}/>
      {petAtual ? (
        <View>
          <Text>{petAtual.tipo}</Text>
          <Text>{petAtual.raca}</Text>
          <Text>{petAtual.nome}</Text>
          <Text>{petAtual.nascimento}</Text>
        </View>
      ): (<><Text>Não há mais pets</Text></>)}
    </View>
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

export default PetView;