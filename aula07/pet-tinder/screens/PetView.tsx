import React, { ReactNode, useState } from 'react';
import { Image, View, Text, TouchableHighlight, TextInput, FlatList, Button, ListRenderItemInfo } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import "../config/i18nconfig";
import {useTranslation} from 'react-i18next';
import { PetControl, usePetControl } from '../control/petHook';
import { Pet, PetSchema } from '../model/pet';
import { estilos } from '../styles/commomStyles';
import MapView, {Marker} from 'react-native-maps';
import { PlacesControl, usePlacesControl } from '../control/placesHook';
import { Place } from '../model/place';

const {Navigator, Screen} = createBottomTabNavigator();

interface PetItemProps extends ListRenderItemInfo<Pet> {
  onApagar : ( id : string ) => void;
}

const PetView : React.FC<any> = () => {
  const petControl : PetControl = usePetControl();
  const placesControl : PlacesControl = usePlacesControl();
  const {message, status} = petControl;
  const textColor = status == 2? "red" : "green";
  return(
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
        <Screen name="Matches" options={
          {
            title: "Matches",
            tabBarIcon : ( iconsProps : {focused : boolean, 
              color: string, size: number} ) : ReactNode => { 
                return (<Entypo name="heart" 
                    color={iconsProps.color} size={iconsProps.size}/>);
            },
          }
        }>
          { ( propsNavigation : any ) => <Matches {...propsNavigation} petControl={petControl}/> }
        </Screen>
        <Screen name="Map" options={
          {
            title: "Map",
            tabBarIcon : ( iconsProps : {focused : boolean, 
              color: string, size: number} ) : ReactNode => { 
                return (<Entypo name="map" 
                    color={iconsProps.color} size={iconsProps.size}/>);
            },
          }
        }>
          { ( propsNavigation : any ) => <GoogleMaps {...propsNavigation} placesControl={placesControl}/> }
        </Screen>        
      </Navigator>
    </View>
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
    acaoSalvar, acaoCarregarImagem, mostrarErro
  } = propsNavigation.petControl;

  const {t, i18n} = useTranslation();

  return (
    <View style={{flex: 1}}>
      <TextInput style={estilos.input}
        value={tipo} onChangeText={setTipo}
        placeholder={t("animal_type")}/>
      {mostrarErro("tipo") && 
      (<Text style={{color: "red", fontSize: 10}}>{mostrarErro("tipo")}</Text>)}
      <TextInput style={estilos.input} 
        value={raca} onChangeText={setRaca}
        placeholder="Raça:"/>
      {mostrarErro("raca") && 
      (<Text style={{color: "red", fontSize: 10}}>{mostrarErro("raca")}</Text>)}        
      <TextInput style={estilos.input}
        value={nome} onChangeText={setNome}
        placeholder="Nome:"/>
      {mostrarErro("nome") && 
      (<Text style={{color: "red", fontSize: 10}}>{mostrarErro("nome")}</Text>)}        
      <TextInput style={estilos.input} 
        value={nascimento} onChangeText={setNascimento}
        placeholder="Nascimento:" />
      {mostrarErro("nascimento") && 
      (<Text style={{color: "red", fontSize: 10}}>{mostrarErro("nascimento")}</Text>)}        
      <TextInput style={estilos.input} keyboardType="number-pad"
        value={peso} onChangeText={setPeso}
        placeholder="Peso:"/>
      {mostrarErro("peso") && 
      (<Text style={{color: "red", fontSize: 10}}>{mostrarErro("peso")}</Text>)}        
      <Button title="Carregar Imagem" onPress={async ()=>acaoCarregarImagem()} />     
      <TouchableHighlight onPress={async ()=>acaoSalvar()}>
        <View style={estilos.button}>
          <Text style={estilos.buttonText}>Salvar</Text>
        </View>
      </TouchableHighlight>
      <Button title="Português" onPress={()=>i18n.changeLanguage("pt")} />
      <Button title="Inglês" onPress={()=>i18n.changeLanguage("en")} />

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

const GoogleMaps : React.FC<any> = ( propsNavigation ) => {
  const placesControl = propsNavigation.placesControl;
  const markerVisual = placesControl.places.map( ( plc : Place, indice : number ) => 
    <Marker key={"MapKey" + indice} title={plc.title}
            description={plc.description}
            coordinate={{latitude: plc.latitude, longitude: plc.longitude}}
  /> );
  return (
    <View style={{flex: 1}}>
      <Button title="Carregar" onPress={async ()=>{placesControl.retrievePlaces()}}/>
      <MapView style={{flex: 1}} initialRegion={{
        latitude:-23.66505773581433, 
        longitude:-46.700587033730386,
        latitudeDelta: 0.1922,
        longitudeDelta: 0.1422
      }}>
          {markerVisual}
      </MapView>
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
 

export default PetView;