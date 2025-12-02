import {object, string, InferType, number} from 'yup';

interface Place { 
    title : string;
    description : string;
    latitude: number;
    longitude: number;
}

export {Place}