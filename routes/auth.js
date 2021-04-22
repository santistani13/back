const { Router } = require( 'express' );
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router(); 

router.post( '/', [
    check('email', 'Email obligatorio').isEmail(),
    check('password', 'Password obligatorio').not().isEmpty(),
    validarCampos
], login ); 

router.post( '/google', [
    check('token', 'Token obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn ); 








module.exports = router; 