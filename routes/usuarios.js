
/*   Route
   /api/usuarios
*/ 
const { Router } = require('express');
const { getUsuarios, crearUsuarios, actualizarUsuario, eliminarUsuario } = require ( '../controllers/usuarios' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { validarToken } = require('../middlewares/validar-token');
const router = Router();

router.get( '/', getUsuarios ); 

router.post( '/',[ 
   check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
   check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
   check('email', 'El email es obligatorio').isEmail(),
   validarCampos
 ], crearUsuarios ); 

 router.put( '/:id', [
   check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
   check( 'role', 'El role es obligatori0' ).isEmail(),
   check('email', 'El email es obligatorio').isEmail(),
   validarCampos
 ],  actualizarUsuario ); 

 router.delete( '/:id', eliminarUsuario );

 module.exports = router; 