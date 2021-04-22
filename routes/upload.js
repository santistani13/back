
const { Router } = require('express');
const { uploadFile, retornarImagen } = require('../controllers/upload');
const expressfileUpload = require('express-fileupload');
const router = Router();

router.use(expressfileUpload()); 

router.put('/:tipo/:id', uploadFile); 

router.get( '/:tipo/:foto', retornarImagen );

module.exports = router; 