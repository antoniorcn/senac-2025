const PORT = 8080;
const express = require("express");
const cors = require("cors");
const api = express();
api.use( express.json() );
api.use( cors() );

const usuarios = [
    {id: 1, username: "user1@teste.com", senha: "123456"},
    {id: 2, username: "admin@teste.com", senha: "123456"},
    {id: 3, username: "user2@teste.com", senha: "123456"},
];

const pets = [ 
    {id: 1, nome: "Fifi", tipo: "cachorro", raca: "poodle", nascimento: "2020-06-04"},
    {id: 2, nome: "Prea", tipo: "porquinho-india", raca: "generica", nascimento: "2019-08-23"},
];

let indicePet = 3;

console.log(" Servidor Backend do Pet-Tinder ");


api.get("/", (request, response) => {
    console.log("Alguem acessou a rota /");
    response.send("<h1>Bem vindo ao servidor do Pet-Tinder</h1>");
} );

api.get("/pets", (request, response) => {
    response.json( pets );

});

api.post("/pets", (request, response) => {
    request.body.id = indicePet++;
    pets.push( request.body );
    response.json( {status: "ok"} );
});

api.delete("/pets/:id", (request, response) => {
    const id = parseInt(request.params.id)
    const novoPets = pets.filter( ( pet ) => pet.id !== id );
    if (novoPets.length  == pets.length ) { 
        response.json( {status: "erro"} );
    } else { 
        pets.splice(0, pets.length);
        pets.push(...novoPets);
        response.json( {status: "ok"} );
    }
});

api.put("/pets/:id", (request, response) => {
    const id = parseInt(request.params.id);
    let encontrado = false;
    for(let i = 0; i < pets.length; i++) { 
        const pet = pets[i];
        if (pet.id == id) { 
            request.body.id = id;
            pets[i] = request.body
            encontrado = true;
            break;
        }
    }
    if (encontrado) { 
        response.json( {status: "ok"} );
    } else {
        response.json( {status: "erro"} );
    }
});

api.listen( PORT, ()=>{
    console.log(`Servidor iniciado na porta ${PORT}`);
} );