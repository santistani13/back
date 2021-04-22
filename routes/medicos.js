
/*   Route
   /api/medicos
*/ 
const { Router } = require('express');
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { validarToken } = require('../middlewares/validar-token');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const router = Router();

router.get( '/', getMedicos ); 

router.post( '/',[
   check('nombre', 'el nombre es necesario').not().isEmpty(),
   check('hospital', 'El hospital id debe ser valido').isMongoId(), 
   validarCampos
], crearMedico ); 

 router.put( '/:id', [
   check('nombre', 'el nombre es necesario').not().isEmpty(),
   check('hospital', 'El hospital id debe ser valido').isMongoId(), 
   validarCampos
 ],  actualizarMedico ); 

 router.delete( '/:id', borrarMedico );

 module.exports = router; 







