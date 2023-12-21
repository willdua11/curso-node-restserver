const Rol = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no existe en la BD.`)
    }
}

const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error('Este correo ya se encuentra registrado');
    }
}

const idExiste = async( id ) => {
    const existeId = await Usuario.findById(id);
    if ( !existeId ) {
        throw new Error(`Este id ${id} no existe.`);
    }
}

module.exports = {
    esRolValido, emailExiste, idExiste
}