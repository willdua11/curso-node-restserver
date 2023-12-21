const { Router } = require('express');
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch 
} = require('../controllers/usuarios');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, idExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( idExiste ),
    check('rol').custom( esRolValido ),
    validarCampos,
], usuariosPut);

router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo').custom( emailExiste ),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({ min: 6 }),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('rol', 'El rol no es válido').isIn([ 'USER_ROLE', 'ADMIN_ROLE' ]),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( idExiste ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router