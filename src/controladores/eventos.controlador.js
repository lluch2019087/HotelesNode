"use strict"
//importaciones

var Evento = require("../modelos/eventos.model");

function createEventos(req, res) {
    var eventoModel = new Evento();
    var params = req.body;

    if (req.user.rol === "ROL_ADMIN") {
        {
            eventoModel.tipoEvento = params.tipoEvento;
            eventoModel.fecha = params.fecha;
            eventoModel.hora = params.hora;
            eventoModel.hotel = params.hotel;
            Evento.find({ tipoEvento: eventoModel.tipoEvento, hotel: eventoModel.hotel }).exec((err, eventoEncontrado) => {
                if (err) return res.status(500).send({ mensaje: "Error en peticion" });
                if (eventoEncontrado && eventoEncontrado.length >= 1) {
                    return res.status(500).send({ mensaje: "Evento existente" });
                } else {
                    eventoModel.save((err, eventoGuardado) => {
                        if (err) return res.status(500).send({ mensaje: "Error el guardar" });
                        if (eventoGuardado) {
                            res.status(200).send({ eventoGuardado })
                        } else {
                            res.status(404).send({ mensaje: "Error al crear" })
                        }
                    })
                }
            })
        }

    } else res.status(500).send({ mensaje: "No tienes permisos" });
}

function eventosHotel(req, res) {
    var params = req.body;
    //if (req.user.rol === "ROL_USUARIO") {
    if (params.hotel) {
        Evento.find({ hotel: params.hotel }, (err, eventoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "error en peticion" });
            if (!eventoEncontrado) return res.status(500).send({ mensaje: "Hotel inexistente" });
            return res.status(200).send({ eventoEncontrado });
        })


    }
    // } else res.status(500).send({ mensaje: "No tienes permisos" });
}

module.exports = {
    createEventos,
    eventosHotel
}