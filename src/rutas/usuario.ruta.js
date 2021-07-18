"use strict"

var express = require('express');
var usuarioControlador = require("../controladores/usuarios.controlador");


// importacion middlewares para rutas
var md_autorizacion = require("../middlewares/authenticated");
var api = express.Router();
api.post("/createUser", usuarioControlador.createUser);
api.post('/login', usuarioControlador.login);
api.put("/editar/:id", md_autorizacion.ensureAuth, usuarioControlador.editar);
api.delete("/deleteUs/:id", usuarioControlador.deleteUs);
//****** *******************************************************************
api.put("/editarMiCuenta/:id", md_autorizacion.ensureAuth, usuarioControlador.editarMiCuenta);
api.delete("/deleteMiCuenta/:id", usuarioControlador.deleteMiCuenta);
api.get("/obtenerMiCuenta", md_autorizacion.ensureAuth, usuarioControlador.obtenerMiCuenta);
//********************************************************** */
api.get("/obtenerUsers", md_autorizacion.ensureAuth, usuarioControlador.obtenerUsers);
api.get("/obtenerUser/:id", usuarioControlador.obtenerUser);
api.get("/ejemplo", md_autorizacion.ensureAuth, usuarioControlador.ejemplo);
api.post("/obtenerHotel", usuarioControlador.obtenerHotel);
api.get("/obtenerHoteles", usuarioControlador.obtenerHoteles);

module.exports = api;