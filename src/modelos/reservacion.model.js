"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReservacionSchema = Schema({
    fecha_entrada: String,
    fecha_salida: String,
    usuario: { type: Schema.Types.ObjectId, ref: 'usuarios' },
    hotel: { type: Schema.Types.ObjectId, ref: 'hoteles' },
    habitacion: { type: Schema.Types.ObjectId, ref: 'habitaciones' },

});

module.exports = mongoose.model("reservaciones", ReservacionSchema);