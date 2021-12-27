
const { Router } = require('express');
const { check } = require('express-validator');
const { create, login, renew, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-token');
const router = Router();

router.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password requiere mínimo 6 caracteres').isLength({min: 6}),
    validarCampos
], create)


/* LOGIN NORMAL */
router.post('/login',[
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password requiere mínimo 6 caracteres').isLength({min: 6}),
    validarCampos
], login)


/* LOGIN CON GOOGLE */
router.post('/google',[
    check('token', 'El token de Google es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn)



router.get('/renew', validarToken, renew)




module.exports = router