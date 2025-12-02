const PORT = 8080;
const express = require("express");
const cors = require("cors");
const api = express();
const multer = require("multer");
const { randomUUID } = require("crypto");
const fs = require("fs/promises");
const path = require("path");
api.use( express.json() );
api.use( cors() );

const upload = multer({ storage: multer.memoryStorage()});

const IMAGE_PATH = "C:\\images";

const usuarios = [
    {id: 1, username: "user1@teste.com", senha: "123456"},
    {id: 2, username: "admin@teste.com", senha: "123456"},
    {id: 3, username: "user2@teste.com", senha: "123456"},
];

const pets = [ 
    {idTutor: 1, id: 1, nome: "Fifi", tipo: "cachorro", raca: "poodle", nascimento: "2020-06-04", imagem: null},
    {idTutor: 1, id: 2, nome: "Prea", tipo: "porquinho-india", raca: "generica", nascimento: "2019-08-23", imagem: null},
    {idTutor: 2, id: 3, nome: "Sultao", tipo: "cachorro", raca: "pastor alemao", nascimento: "2020-06-04", imagem: null},
    {idTutor: 2, id: 4, nome: "Puss", tipo: "gato", raca: "generica", nascimento: "2019-08-23", imagem: null},

];

let indicePet = 3;

console.log(" Servidor Backend do Pet-Tinder ");


api.get("/", (request, response) => {
    console.log("Alguem acessou a rota /");
    response.send("<h1>Bem vindo ao servidor do Pet-Tinder</h1>");
} );

api.post("/pets/upload/:id", upload.single("imagem"), 
    (request, response) => {
    const id = parseInt(request.params.id);
    const tipo = request.query.tipo;

    console.log("ID: " + id);
    console.log("Tipo da Imagem: " + tipo);



    if (request.file) { 
        console.log("Arquivo de imagem recebido ==> ", request.file);
        const nomeImagem = randomUUID() + "." + tipo;
        console.log("Nome da imagem gerada ==> ", nomeImagem);
        const destino = path.join(IMAGE_PATH, nomeImagem);

        fs.writeFile(destino, request.file.buffer)
        .then(()=>{
             for (const p of pets) { 
                if (p.id === id) { 
                    p.imagem = nomeImagem;
                }
            }
            console.log("Imagem gravada com sucesso");
            response.status(200).json( {status: "ok"} );
        })
        .catch(()=>{
            console.log("Erro ao gravar a imagem");
            response.json( {status: "erro"} );
        })

    } else { 
        console.log("Arquivo de imagem inexistente");
        response.json( {status: "erro imagem inexistente"} );
    }
});

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