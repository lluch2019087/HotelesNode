"use strict"
//importaciones
var Usuario = require("../modelos/usuario.model");
var Hotel = require("../modelos/hotel.model");
var Habitaciones = require("../modelos/habitaciones.model");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../servicios/jwt");

function ejemplo(req, res) {
    if (req.user.rol === "ROL_ADMIN") {
        res.status(200).send({ mensaje: "patito" })
    } else {
        res.status(400).send({ mensaje: "solo el rol de tipo usuario puede acceder" })
    }
}

function admin(req, res) {

    var userModel = Usuario();
    userModel.nombre = "ADMIN"
    userModel.username = "ADMIN"
    userModel.rol = "ROL_ADMIN"
    userModel.imagen = null;
    Usuario.find({ nombre: "ADMIN" }).exec((err, adminEncontrado) => {
        if (err) return console.log({ mensaje: "Error en creacion" });
        if (adminEncontrado && adminEncontrado.length >= 1) {
            return console.log("Admin creado");

        } else {
            bcrypt.hash("123456", null, null, (err, passwordEncriptada) => {
                userModel.password = passwordEncriptada;
                userModel.save((err, adminguardado) => {
                    if (err) return console.log({ mensaje: "Error en la peticion" });
                    if (adminguardado) {
                        console.log("Administrador preparado");
                        if (adminguardado) {

                        }
                    }
                })
            })
        }
    })
}



function createUser(req, res) {
    var userModel = new Usuario();
    var params = req.body;
    // if (req.user.rol === "ROL_ADMIN") {
    if (params.nombre && params.password) {
        userModel.nombre = params.nombre;
        userModel.username = params.username;
        userModel.rol = "ROL_USUARIO";
        userModel.imagen = null;
        Usuario.find({ username: userModel.username }).exec((err, usuarioEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "Error en peticion" });
            if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
                return res.status(500).send({ mensaje: "usuario existente" });

            } else {
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                    userModel.password = passwordEncriptada;
                    userModel.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: "Error en peticion" });

                        if (usuarioGuardado) {
                            res.status(200).send({ usuarioGuardado })
                        } else {
                            res.status(404).send({ mensaje: "Error guardar cliente" })
                        }
                    })
                })
            }
        })
    }
    //} //else res.status(500).send({ mensaje: "No tienes permisos" });
}

function login(req, res) {
    var params = req.body;
    /* Usuario.find() devuelve objetos
       Usuario.findOne() devuelve solo un objeto {} */

    Usuario.findOne({ username: params.username, nombre: params.nombre }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: "Error en peticion" });
        if (usuarioEncontrado) {
            bcrypt.compare(params.password, usuarioEncontrado.password, (err, passVerificada) => {
                if (passVerificada) {
                    if (params.getToken === "true") {
                        return res.status(200).send({
                            token: jwt.createToken(usuarioEncontrado)
                        })
                    } else {
                        usuarioEncontrado.password = undefined;
                        return res.status(200).send({ usuarioEncontrado })
                    }

                } else {
                    return res.status(500).send({ mensaje: "El usuario no se ha podido identificar" })
                }
            })
        } else {
            return res.status(500).send({ mensaje: "Error al buscar usuario" })
        }

    })

}

function editar(req, res) {
    var id = req.params.id;
    var params = req.body;

    //borrar la propiedad de password en el body
    delete params.password;

    if (req.user.rol === "ROL_ADMIN") {
        Usuario.findByIdAndUpdate(id, params, { new: true }, (err, usuarioActualizado) => {
            if (err) return res.status(500).send({ mensaje: " error en la peticion" });
            if (!usuarioActualizado) return res.status(500).send({ mensaje: "No se a podido editar el usuario" });

            return res.status(200).send({ usuarioActualizado })
        })
    } else res.status(500).send({ mensaje: "No tienes permisos" });
}

function deleteUs(req, res) {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, ((err, usuarioDelete) => {
        if (err) return res.status(500).send({ mensaje: " error en la peticion" });
        return res.status(200).send({ usuarioDelete })
    }))

}

function obtenerUsers(req, res) {
    if (req.user.rol === "ROL_ADMIN") {

        Usuario.find().exec((err, usuarios_registrados) => {
            if (err) return res.status(500).send({ mensaje: "Error en peticion" });
            if (!usuarios_registrados) return res.status(500).send({ mensaje: "Error peticion" });
            return res.status(200).send({ usuarios_registrados });
        })

    } else res.status(500).send({ mensaje: "No tienes permisos" });
}

//*********************************************************************************************** */
function editarMiCuenta(req, res) {
    var id = req.params.id;
    var params = req.body;

    //borrar la propiedad de password en el body
    delete params.password;

    if (req.user.rol === "ROL_USUARIO") {
        Usuario.findByIdAndUpdate(id, params, { new: true }, (err, usuarioActualizado) => {
            if (err) return res.status(500).send({ mensaje: " error en la peticion" });
            if (!usuarioActualizado) return res.status(500).send({ mensaje: "No se a podido editar el usuario" });

            return res.status(200).send({ usuarioActualizado })
        })
    } else res.status(500).send({ mensaje: "No tienes permisos" });
}

function deleteMiCuenta(req, res) {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, ((err, usuarioDelete) => {
        if (err) return res.status(500).send({ mensaje: " error en la peticion" });
        return res.status(200).send({ usuarioDelete })
    }))

}

function obtenerMiCuenta(req, res) {
    //var idUsuario = req.user.sub

    //if (params.id) {
    Usuario.findById(req.user.sub, ((err, usuario_registrado) => {
        if (err) return res.status(500).send({ mensaje: "error en peticion" });
        if (!usuario_registrado) return res.status(500).send({ mensaje: "Usuario inexistente" });
        return res.status(200).send({ usuario_registrado });
    }))


}

//******************************************************************************************************** */


function obtenerUser(req, res) {
    var id = req.params.id;
    //if (req.user.rol === "ROL_ADMIN") {

    Usuario.findOne({ _id: id }, (err, usuario_registrado) => {
        if (err) return res.status(500).send({ mensaje: "Error en peticion" });
        if (!usuario_registrado) return res.status(500).send({ mensaje: "Error en peticion" });
        return res.status(200).send({ usuario_registrado });
    })

    //} else res.status(500).send({ mensaje: "No tienes permisos" });
}

function obtenerHotel(req, res) {
    var params = req.body;
    Hotel.findOne({ nombre: params.hotel }, (err, hotelEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
        if (!hotelEncontrado) {
            Hotel.findOne({ direccion: params.hotel }, (err, hotelEncontrado) => {
                if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
                if (!hotelEncontrado) return res.status(500).send({ mensaje: 'este hotel no existe' });

                return res.status(200).send({ hotelEncontrado });
            })

        } else {
            return res.status(200).send({ hotelEncontrado });
        }
    });

}

function obtenerHoteles(req, res) {
    // if (req.user.rol === "ROL_ADMIN") {
    Hotel.find().exec((err, hoteles_encontrados) => {
            if (err) return res.status(500).send({ mensaje: "Error en peticion" });
            if (!hoteles_encontrados) return res.status(500).send({ mensaje: "Error en peticion" });
            return res.status(200).send({ hoteles_encontrados });
        })
        //} else res.status(500).send({ mensaje: "No tienes permisos" });
}



module.exports = {
    ejemplo,
    createUser,
    admin,
    login,
    editar,
    deleteUs,
    obtenerUsers,
    obtenerUser,
    obtenerHotel,
    obtenerHoteles,
    editarMiCuenta,
    deleteMiCuenta,
    obtenerMiCuenta

}