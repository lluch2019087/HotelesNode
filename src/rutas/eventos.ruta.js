"use strict"

var express = require('express');
var eventoControlador = require("../controladores/eventos.controlador");


// importacion middlewares para rutas
var md_autorizacion = require("../middlewares/authenticated");
var api = express.Router();

api.post("/createEventos", md_autorizacion.ensureAuth, eventoControlador.createEventos);
api.post("/eventosHotel", eventoControlador.eventosHotel);

module.exports = api;