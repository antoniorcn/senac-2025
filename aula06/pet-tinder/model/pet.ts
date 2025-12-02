import { object, string, number, date, InferType } from 'yup';
import i18n from "../config/i18nconfig";
const PetSchema = object({
  idTutor : number().required().positive().integer(),
  id: number().nullable(),
  tipo: string().required(i18n.t("animal_type_required")).max(50, "No maximo 50 caracteres"),
  raca: string().required("Raça é uma informação necessária").max(30),
  nome: string().required().max(50),
  nascimento: date().required().default(()=>new Date()),
  peso: number().required().positive("O peso deve ser um valor positivo")
});

type Pet = InferType<typeof PetSchema>;

// interface Pet {
//   idTutor : number;
//     id? : number;
//   tipo : string;
//   raca : string;
//   nome : string;
//   nascimento : string;
//   peso : number;
// }

export { PetSchema, Pet };