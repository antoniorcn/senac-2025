const PORT = 8080;
const express = require("express");
const api = express();
api.use( express.json() );

const usuarios = [
    {id: 1, username: "user1@teste.com", senha: "123456"},
    {id: 2, username: "admin@teste.com", senha: "123456"},
    {id: 3, username: "user2@teste.com", senha: "123456"},
];

const pets = [ 
    {id: 1, nome: "Fifi", tipo: "cachorro", raca: "poodle", nascimento: "2020-06-04"},
    {id: 2, nome: "Prea", tipo: "porquinho-india", raca: "generica", nascimento: "2019-08-23"},
];

console.log(" Servidor Backend do Pet-Tinder ");


api.get("/", (request, response) => {
    console.log("Alguem acessou a rota /");
    response.send("<h1>Bem vindo ao servidor do Pet-Tinder</h1>");
} );

api.get("/pets", (request, response) => {
    response.json( pets );

});

api.post("/pets", (request, response) => {
    pets.push( request.data );
    response.json( {status: "ok"} );
});

api.listen( PORT, ()=>{
    console.log(`Servidor iniciado na porta ${PORT}`);
} );