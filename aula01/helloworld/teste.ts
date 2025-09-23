const nome : string = "Joao Silva";

const lista : Array<number> = [10, 20, 30];


let tituloEleitor : string | undefined;

let aluno : [number, string] = [10, ""];

const objeto : {nome: string, 
        idade: number, 
        documento?: any} = 
        
        {nome: "Antonio", 
            idade: 48};

type NomeMes = "Janeiro" | "Fevereiro" | "Março";

type Contato = {nome: string, telefone: string, email: string, pagina?: string};

const obj1 : Contato = {nome: "Joao", email: "j@teste.com", telefone: "1123123"};


const nascimento : NomeMes = "Março";

console.log("Nome: ", nome);
console.log("Lista: ", lista);