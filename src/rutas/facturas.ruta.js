"use strict"

var express = require('express');
var facturaControlador = require("../controladores/facturas.controlador");


// importacion middlewares para rutas
var md_autorizacion = require("../middlewares/authenticated");
var api = express.Router();

module.exports = api;