"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventosSchema = Schema({
    tipoEvento: String,
    fecha: String,
    hora: String,
    hotel: { type: Schema.Types.ObjectId, ref: 'hoteles' }
});

module.exports = mongoose.model("eventos", EventosSchema);