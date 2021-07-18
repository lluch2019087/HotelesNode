"use strict"
var express = require('express');
var habitacionControlador = require("../controladores/habitaciones.controlador");


// importacion middlewares para rutas
var md_autorizacion = require("../middlewares/authenticated");
var api = express.Router();

api.post("/createHabitacion", md_autorizacion.ensureAuth, habitacionControlador.createHabitacion);
api.post("/habitaciones", habitacionControlador.habitaciones);



module.exports = api;