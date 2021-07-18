"use strict"
//importaciones

var Hotel = require("../modelos/hotel.model");
var Reservacion = require("../modelos/reservacion.model");
var Usuario = require("../modelos/usuario.model");
const usuarioModel = require("../modelos/usuario.model");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../servicios/jwt");

function createHotel(req, res) {
    var hotelModel = new Hotel();
    var params = req.body;

    if (req.user.rol === "ROL_ADMIN") {
        if (params.nombre && params.administrador && params.direccion && params.habitaciones) {
            hotelModel.nombre = params.nombre;
            hotelModel.direccion = params.direccion;
            hotelModel.habitaciones = params.habitaciones;
            hotelModel.administrador = params.administrador;
            Hotel.find({ nombre: hotelModel.nombre }).exec((err, hotelEncontrado) => {
                if (err) return res.status(500).send({ mensaje: "Error en peticion" });
                if (hotelEncontrado && hotelEncontrado.length >= 1) {
                    return res.status(500).send({ mensaje: "Hotel existente" });
                } else {
                    hotelModel.save((err, hotelGuardado) => {
                        if (err) return res.status(500).send({ mensaje: "Error el guardar" });
                        if (hotelGuardado) {
                            res.status(200).send({ hotelGuardado })
                        } else {
                            res.status(404).send({ mensaje: "Error al crear" })
                        }
                    })
                }
            })
        }
    } else { res.status(500).send({ mensaje: "No tienes permisos" }) }
}

function createAdminHotel(req, res) {
    if (req.user.rol === "ROL_ADMIN") {
        var usuarioModel = new Usuario();
        var params = req.body;
        if (params.nombre && params.password) {
            usuarioModel.nombre = params.nombre;
            usuarioModel.username = params.username;
            usuarioModel.rol = "ROL_ADMINHOTEL";
            Usuario.find({ username: usuarioModel.username, nombre: usuarioModel.nombre }).exec((err, usuarioEncontrado) => {
                if (err) return res.status(500).send({ mensaje: "Error en peticion" });
                if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
                    return res.status(500).send({ mensaje: "usuario existente" });

                } else {
                    bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;
                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500).send({ mensaje: "Error en peticion" });

                            if (usuarioGuardado) {
                                res.status(200).send({ usuarioGuardado })
                            } else {
                                res.status(404).send({ mensaje: "Error guardar admin" })
                            }
                        })
                    })
                }
            })
        }
    } else { res.status(500).send({ mensaje: "No tienes permisos" }) }
}

function deleteAdminHotel(req, res) {
    if (req.user.rol === "ROL_ADMIN") {
        var id = req.params.id;
        Usuario.findByIdAndRemove(id, ((err, AdminEliminado) => {
            if (err) return res.status(500).send({ mensaje: " error en la peticion" });
            return res.status(200).send({ AdminEliminado })
        }))
    } else res.status(500).send({ mensaje: "No tienes permisos" });
}

function obtenerAdminHotel(req, res) {
    if (req.user.rol === "ROL_ADMIN") {
        Usuario.find({ rol: "ROL_ADMINHOTEL" }, (err, usuarios) => {
            if (err) return res.status(500).send({ mensaje: "Error en peticion" });
            if (!usuarios) return res.status(500).send({ mensaje: "Error peticion" });
            return res.status(200).send({ usuarios });
        })
    } else res.status(500).send({ mensaje: "No tienes permisos" });
}

function editarHotel(req, res) {
    var id = req.params.id;
    var params = req.body;

    //borrar la propiedad de password en el body
    delete params.password;

    if (req.user.rol === "ROL_ADMIN") {
        Hotel.findByIdAndUpdate(id, params, { new: true }, (err, hotelActualizado) => {
            if (err) return res.status(500).send({ mensaje: " error en la peticion" });
            if (!hotelActualizado) return res.status(500).send({ mensaje: "No se a podido editar el usuario" });

            return res.status(200).send({ hotelActualizado })
        })
    } else res.status(500).send({ mensaje: "No tienes permisos" });
}

function deleteHotel(req, res) {
    if (req.user.rol === "ROL_ADMIN") {
        var id = req.params.id;
        Hotel.findByIdAndRemove(id, ((err, hoteleliminado) => {
            if (err) return res.status(500).send({ mensaje: " error en la peticion" });
            return res.status(200).send({ hoteleliminado })
        }))
    } else res.status(500).send({ mensaje: "No tienes permisos" });
}

function obtenerHotel(req, res) {
    var id = req.params.id;
    if (req.user.rol === "ROL_ADMIN") {

        Hotel.findOne({ _id: id }, (err, hotel_registrado) => {
            if (err) return res.status(500).send({ mensaje: "Error en peticion" });
            if (!hotel_registrado) return res.status(500).send({ mensaje: "Error en peticion" });
            return res.status(200).send({ hotel_registrado });
        })

    } else res.status(500).send({ mensaje: "No tienes permisos" });
}

function buscarUsuario(req, res) {
    var params = req.body;

    if (req.user.rol === "ROL_ADMINHOTEL") {
        Hotel.findOne({ administrador: req.user.sub }, (err, hotelEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "error en peticion" });
            if (!hotelEncontrado) return res.status(500).send({ mensaje: "Hotel inexistente" });

            usuarioModel.findOne({ nombre: params.nombre }, (err, usuarioEncontrado) => {
                if (err) return res.status(500).send({ mensaje: "error en peticion" });
                if (!usuarioEncontrado) return res.status(500).send({ mensaje: "Usuario inexistente" });

                Reservacion.find({ usuario: usuarioEncontrado._id, hotel: hotelEncontrado._id }, (err, reservacionEncontrada) => {
                    if (err) return res.status(500).send({ mensaje: "error en peticion" });
                    if (reservacionEncontrada) return res.status(200).send({ usuarioEncontrado })
                });
            })

        });

    } else res.status(500).send({ mensaje: "No tienes permisos" });
}


module.exports = {
    createHotel,
    editarHotel,
    deleteHotel,
    obtenerHotel,
    buscarUsuario,
    createAdminHotel,
    obtenerAdminHotel,
    deleteAdminHotel
}