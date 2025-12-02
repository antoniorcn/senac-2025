import { retrievePlacesApi } from "../api/placeApi";
import { Place } from "../model/place";

const retrievePlaceUseCase = async () : Promise<Place[]>=> {
    try { 
        return await retrievePlacesApi();
    } catch( err ) { 
        console.error(err);
        return [];
    }

}

export { retrievePlaceUseCase }