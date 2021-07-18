"use strict"
//importaciones

var Habitacion = require("../modelos/habitaciones.model");

function createHabitacion(req, res) {
    var habitacionesmodel = new Habitacion();
    var params = req.body;

    if (req.user.rol === "ROL_ADMIN") {
        if (params.nombre && params.hotel) {
            habitacionesmodel.nombre = params.nombre;
            habitacionesmodel.precio = params.precio;
            habitacionesmodel.disponibilidad = 'disponible'
            habitacionesmodel.hotel = params.hotel;
            Habitacion.find({ nombre: habitacionesmodel.nombre, hotel: habitacionesmodel.hotel }).exec((err, habitacionEncontrada) => {
                if (err) return res.status(500).send({ mensaje: "Error en peticion" });
                if (habitacionEncontrada && habitacionEncontrada.length >= 1) {
                    return res.status(500).send({ mensaje: "Habitacion existente" });
                } else {
                    habitacionesmodel.save((err, habitacionGuardada) => {
                        if (err) return res.status(500).send({ mensaje: "Error el guardar" });
                        if (habitacionGuardada) {
                            res.status(200).send({ habitacionGuardada })
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



function habitaciones(req, res) {
    var params = req.body;
    //if (req.user.rol === "ROL_USUARIO") {
    if (params.hotel) {
        Habitacion.find({ hotel: params.hotel }, (err, habitacionesEncontradas) => {
            if (err) return res.status(500).send({ mensaje: "error en peticion" });
            if (!habitacionesEncontradas) return res.status(500).send({ mensaje: "Hotel inexistente" });
            return res.status(200).send({ habitacionesEncontradas });
        })

    }
    //} else res.status(500).send({ mensaje: "No tienes permisos" });
}

module.exports = {
    createHabitacion,
    habitaciones
}