"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FacturasSchema = Schema({
    total: String,
    usuario: { type: Schema.Types.ObjectId, ref: 'usuarios' },
    reservacion: { type: Schema.Types.ObjectId, ref: 'reservaciones' }
});

module.exports = mongoose.model("facturas", FacturasSchema);