"use strict"

var express = require('express');
var servicioControlador = require("../controladores/servicios.controlador");


// importacion middlewares para rutas
var md_autorizacion = require("../middlewares/authenticated");
var api = express.Router();

api.post("/createServicio", md_autorizacion.ensureAuth, servicioControlador.createServicio);
api.post("/serviciosHotel", servicioControlador.serviciosHotel);

module.exports = api;