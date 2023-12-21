const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const usuariosGet = async(req = request, res = response) => {
    const  { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(desde).limit(Number(limite))
    ]);

    res.json({
        total, usuarios
    });
}

const usuariosPut = async(req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    // TODO validar contra base de datos
    if ( password ) {
        // Encryptar contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'put API - Controlador',
        usuario
    });
}

const usuariosPost = async(req, res) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encryptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    // Guardar en DB
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usuariosDelete = async(req, res) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false} );

    res.json({
        usuario_eliminado: usuario
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

module.exports = {
    usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch
}