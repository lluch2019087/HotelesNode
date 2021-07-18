"use strict"
var express = require('express');
var hotelControlador = require("../controladores/hoteles.controlador");

// importacion middlewares para rutas
var md_autorizacion = require("../middlewares/authenticated");
var api = express.Router();

api.post("/createHotel", md_autorizacion.ensureAuth, hotelControlador.createHotel);
api.post("/createAdminHotel", md_autorizacion.ensureAuth, hotelControlador.createAdminHotel);
api.put("/editarHotel/:id", md_autorizacion.ensureAuth, hotelControlador.editarHotel);
api.delete("/deleteHotel/:id", md_autorizacion.ensureAuth, hotelControlador.deleteHotel);
api.delete("/deleteAdminHotel/:id", md_autorizacion.ensureAuth, hotelControlador.deleteAdminHotel);
api.get("/obtenerHotel/:id", md_autorizacion.ensureAuth, hotelControlador.obtenerHotel);
api.get("/obtenerAdminHotel", md_autorizacion.ensureAuth, hotelControlador.obtenerAdminHotel);
api.get("/buscarUsuario", md_autorizacion.ensureAuth, hotelControlador.buscarUsuario);


module.exports = api;