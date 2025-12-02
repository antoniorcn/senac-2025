import { useState } from "react";
import MapView, {Marker} from 'react-native-maps';
import { Place } from "../model/place";
import { retrievePlaceUseCase } from "../useCases/placeUseCases";


interface PlacesControl { 

    places : Place[];
    visualMarkers : React.ReactNode[];

    message : string;
    status : number;
    
    retrievePlaces : () => void;
}

interface PlacesControlProps { 
}


const usePlacesControl = 
        ( props : PlacesControlProps ) : PlacesControl => {
        // ( usuarioControlProps : UsuarioControlProps ) : UsuarioControl => {

    const [places, setPlaces] = useState<Place[]>([]);
    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<number>(0); //0 - sem status,   1 - Ok,    2 - Erro
    const [visualMarkers, setVisualMarkers] = useState<React.ReactNode[]>([]);

    const retrievePlaces = async () => {
        try {
            const tempPlaces = await retrievePlaceUseCase();
            setPlaces( tempPlaces );

            // setVisualMarkers(tempPlaces.map( ( plc : Place ) : React.ReactNode => (
            //             <Marker title={plc.title}
            //                 description={plc.description}
            //                 coordinate={{
            //                     latitude: plc.latitude,
            //                     longitude: plc.longitude
            //                 }}/>
            //             )
            // ));
            setMessage("Locais carregados com sucesso");
            setStatus( 1 );
        } catch ( error : any ) { 
            setMessage(`Erro ao carregar os locais:  ${error.message}`);
            setStatus( 2 );
        }
    }

    return {
        places, visualMarkers, 
        message, status, retrievePlaces
    }

}

export { usePlacesControl, PlacesControl };