const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: (true, 'El nombre es obligatorio')
    },
    correo: {
        type: String,
        required: (true, 'El correo es obligatorio'),
        unique: true
    },
    password: {
        type: String,
        required: (true, 'El password es obligatorio')
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        // enum: ('ADMIN_ROLE', 'USER_ROLE'),
        required: true
    },
    estado: {
        type: String,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema )