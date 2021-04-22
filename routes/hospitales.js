
/*   Route
   /api/hospitales
*/ 
const { Router } = require('express');
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { validarToken } = require('../middlewares/validar-token');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');
const router = Router();

router.get( '/', getHospitales ); 

router.post( '/',[
   check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
   validarCampos
], crearHospital ); 

 router.put( '/:id', [
   check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
   validarCampos
 ],  actualizarHospital ); 

 router.delete( '/:id', 
 borrarHospital );

 module.exports = router; 





