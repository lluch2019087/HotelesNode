"use strict"
//importaciones

var Reservacion = require("../modelos/reservacion.model");
var Hotel = require("../modelos/hotel.model");
const usuarioModel = require("../modelos/usuario.model");

function createReservacion(req, res) {
    var reservacionModel = new Reservacion();
    var params = req.body;

    if (req.user.rol === "ROL_USUARIO") {

        if (params.habitacion && params.fecha_entrada && params.fecha_salida) {
            reservacionModel.fecha_entrada = params.fecha_entrada;
            reservacionModel.fecha_salida = params.fecha_salida;
            reservacionModel.usuario = req.user.sub;
            reservacionModel.hotel = params.hotel;
            reservacionModel.habitacion = params.habitacion;
            Reservacion.find({ habitacion: reservacionModel.habitacion }).exec((err, reservacionEncontrada) => {
                if (err) return res.status(500).send({ mensaje: "Error en peticion" });
                if (reservacionEncontrada && reservacionEncontrada.length >= 1) {
                    return res.status(500).send({ mensaje: "Habitacion no disponible" });
                } else {
                    reservacionModel.save((err, reservacionGuardado) => {
                        if (err) return res.status(500).send({ mensaje: "Error el guardar" });
                        if (reservacionGuardado) {
                            res.status(200).send({ reservacionGuardado })
                        } else {
                            res.status(404).send({ mensaje: "Error al crear" })
                        }
                    })
                }
            })

        }

    } else {
        res.status(500).send({ mensaje: 'No tienes permisos' });
    }
}


function listarReservaciones(req, res) {
    var params = req.body;
    if (req.user.rol === "ROL_ADMINHOTEL") {
        Hotel.findOne({ administrador: req.user.sub }, (err, hotelEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "error en peticion" });
            if (!hotelEncontrado) return res.status(500).send({ mensaje: "Hotel inexistente" });

            Reservacion.find({ hotel: hotelEncontrado._id }, (err, reservacionEncontrada) => {
                if (err) return res.status(500).send({ mensaje: "error en peticion" });
                if (reservacionEncontrada) return res.status(200).send({ reservacionEncontrada })
            });
        });

    } else res.status(500).send({ mensaje: "No tienes permisos" });
}

module.exports = {
    createReservacion,
    listarReservaciones
}