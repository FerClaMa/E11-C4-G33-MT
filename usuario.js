const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
mongoose.connect(
  "mongodb+srv://admin2:admin@clustergrupo33.l0xzt5u.mongodb.net/bd_g33?retryWrites=true&w=majority"
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  cedula: String,
  edad: Number,
});

const UsuarioModelo = new mongoose.model("usuarios", usuarioSchema);

//const usuario =

app.post("/AgregarUsuario", (request, response) => {
  // response.setHeader("Content-Type", "text/plain");
  let usuario = new UsuarioModelo({
    nombre: request.body.nombre,
    cedula: request.body.cedula,
    edad: request.body.edad,
  });

  usuario.save(function (error, datos) {
    if (error) {
      response.send("Uy hubo un error al crear un usuario");
    } else {
      response.send("Gracias, has creado un usuario nuevo");
    }
  });
});

app.delete("/EliminarUsuario", (request, response) => {
  UsuarioModelo.deleteOne(
    { cedula: request.body.cedula },
    function (error, documento) {
      if (error) {
        response.send("Ups, ocurrió un error al eliminar un usuario");
      } else {
        response.send("El usuario ha sido eliminado");
      }
    }
  );
});

app.get("/UsuarioCedula", (request, response) => {
  UsuarioModelo.find(
    { cedula: request.body.cedula | request.query.cedula },
    function (error, documentos) {
      if (error) {
        response.send("Ups, ocurrió un error al eliminar un usuario");
      } else {
        response.send(documentos);
      }
    }
  );
});

app.get("/", (request, response) => {
  response.send("<h1 style='color:red'>Bienvenidos a la ruta raíz</h1>");
});

app.get("/inicio", (request, response) => {
  response.send("Hola grupo 33");
});

app.listen(3000, () => {
  console.log("Servidor escuchando...");
});