"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ServicioSchema = Schema({
    nombre: String,
    hotel: { type: Schema.Types.ObjectId, ref: 'hoteles' }
});

module.exports = mongoose.model("servicios", ServicioSchema);