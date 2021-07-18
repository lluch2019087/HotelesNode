'use strict'

// VARIABLES GLOBALES
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// IMPORTACION DE RUTAS
var usuario_rutas = require("./src/rutas/usuario.ruta");
var hotel_rutas = require("./src/rutas/hoteles.ruta");
var habitacion_rutas = require("./src/rutas/habitaciones.ruta");
var reservaciones_rutas = require("./src/rutas/reservaciones.ruta");
var facturas_rutas = require("./src/rutas/facturas.ruta");
var eventos_rutas = require("./src/rutas/eventos.ruta");
var servicio_rutas = require("./src/rutas/servicios.ruta");



// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cabecera
app.use(cors());

// APLICACION DE RUTAS  localhost:3000/api/ejemplo
app.use('/api', usuario_rutas, hotel_rutas, habitacion_rutas, reservaciones_rutas,
    facturas_rutas, eventos_rutas, servicio_rutas);


// EXPORTAR
module.exports = app;