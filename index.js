const { response, request } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

// CAMBIAR EL LINK
mongoose.connect("mongodb+srv://admin2:admin@clustergrupo33.l0xzt5u.mongodb.net/bd_g33?retryWrites=true&w=majority");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  cedula: String,
  edad: Number,
});

const vehiculosSchema = new mongoose.Schema({
  marca: String,
  placa: String,
  pais: Number,
});

const UsuarioModelo = new mongoose.model("usuarios", usuarioSchema);
const VehiculoModelo = new mongoose.model("vehiculos",vehiculosSchema,"vehiculos");

//CRUD-USUARIO

app.post("/AgregarUsuario", (request, response) => {
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

app.get("/BuscarUsuario", (request, response) => {
  const cedula = request.body.cedula ? request.body.cedula : request.query.cedula;
  UsuarioModelo.find({cedula},
    // { cedula: request.body.cedula | request.query.cedula },
    function (error, documentos) {
      if (error) {
        response.send("Ups, ocurrió un error al eliminar un usuario");
      } else {
        response.send(documentos);
      }
    }
  );
});


//CRUD-VEHICULO

app.post("/AgregarVehiculo", (request, response) => {
  let vehiculo = new VehiculoModelo({
    marca: request.body.marca,
    placa: request.body.placa,
    pais: request.body.pais,
  });

  vehiculo.save(function (error, datos) {
    if (error) {
      response.send("Uy hubo un error al crear el vehículo");
    } else {
      response.send("Gracias, has creado un vehículo nuevo");
    }
  });
});

app.delete("/EliminarVehiculo", (request, response) => {
  VehiculoModelo.deleteOne(
    { placa: request.body.placa },
    function (error, documento) {
      if (error) {
        response.send("Ups, ocurrió un error al eliminar el vehículo");
      } else {
        response.send("El vehículo ha sido eliminado");
      }
    }
  );
});

app.get("/BuscarVehiculo", (request, response) => {
  const placa = request.body.placa ? request.body.placa : request.query.placa;
  VehiculoModelo.find({placa},
    // { cedula: request.body.cedula | request.query.cedula },
    function (error, documentos) {
      if (error) {
        response.send("Ups, ocurrió un error al eliminar un usuario");
      } else {
        response.send(documentos);
      }
    }
  );
});

//HOME-INICIO-LOCALHOST

app.get("/", (request, response) => {
  response.send("<h1 style='color:red'>Bienvenidos a la ruta raíz</h1>");
});

app.get("/inicio", (request, response) => {
  response.send("Hola grupo 33");
});

app.listen(3000, () => {
  console.log("Servidor escuchando...");
});
