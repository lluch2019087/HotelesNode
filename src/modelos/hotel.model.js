"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    nombre: String,
    direccion: String,
    habitaciones: String,
    administrador: { type: Schema.Types.ObjectId, ref: "usuarios" }
});

module.exports = mongoose.model("hoteles", HotelSchema);