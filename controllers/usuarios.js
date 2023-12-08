const { response } = require('express');

const usuariosGet = (req = request, res = response) => {
    const {nombre = 'No name', id, apikey } = req.query;

    res.json({
        msg: 'get API - Controlador', nombre, id, apikey
    });
}

const usuariosPut = (req, res) => {
    const { id } = req.params;

    res.json({
        msg: 'put API - Controlador',
    });
}

const usuariosPost = (req, res) => {
    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - Controlador',
        nombre, edad
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - Controlador'
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