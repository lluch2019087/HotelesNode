"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HabitacionSchema = Schema({
    nombre: String,
    precio: String,
    disponibilidad: String,
    hotel: { type: Schema.Types.ObjectId, ref: "hoteles" }
});

module.exports = mongoose.model("habitaciones", HabitacionSchema);