"use strict"
//importaciones

var Servicio = require("../modelos/servicios.model");

function createServicio(req, res) {
    var servicioModel = new Servicio();
    var params = req.body;
    if (req.user.rol === "ROL_ADMIN") {


        servicioModel.nombre = params.nombre;
        servicioModel.hotel = params.hotel;
        Servicio.find({ nombre: servicioModel.nombre }).exec((err, servicioEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "Error en peticion" });
            if (servicioEncontrado && servicioEncontrado.length >= 1) {
                return res.status(500).send({ mensaje: "Servicio existente" });
            } else {
                servicioModel.save((err, servicioGuardado) => {
                    if (err) return res.status(500).send({ mensaje: "Error el guardar" });
                    if (servicioGuardado) {
                        res.status(200).send({ servicioGuardado })
                    } else {
                        res.status(404).send({ mensaje: "Error al crear" })
                    }
                })
            }
        })
    } else { res.status(500).send({ mensaje: "No tienes permisos" }) }

}


function serviciosHotel(req, res) {
    var params = req.body;
    //if (req.user.rol === "ROL_USUARIO") {
    if (params.hotel) {
        Servicio.find({ hotel: params.hotel }, (err, servicioEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "error en peticion" });
            if (!servicioEncontrado) return res.status(500).send({ mensaje: "Hotel inexistente" });
            return res.status(200).send({ servicioEncontrado });
        })


    }
    // } else res.status(500).send({ mensaje: "No tienes permisos" });
}

module.exports = {
    createServicio,
    serviciosHotel
}