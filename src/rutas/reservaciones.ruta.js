"use strict"

var express = require('express');
var reservacionControlador = require("../controladores/reservaciones.controlador");


// importacion middlewares para rutas
var md_autorizacion = require("../middlewares/authenticated");
var api = express.Router();

api.post("/createReservacion", md_autorizacion.ensureAuth, reservacionControlador.createReservacion);
api.get("/listarReservaciones", md_autorizacion.ensureAuth, reservacionControlador.listarReservaciones);


module.exports = api;