

const { Router } = require('express');
const { validarCampos } = require( '../middlewares/validar-campos' );
const { getTodo } = require('../controllers/todo'); 
const router = Router();

router.get('/:busqueda', getTodo);






module.exports = router; 


