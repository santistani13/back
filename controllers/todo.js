const { response } = require('express'); 
const Usuarios = require('../models/usuarios');
const Medicos = require('../models/medicos');
const Hospitales = require('../models/hospital');

const getTodo = async  ( req, res = response ) => {
 
    const busqueda = req.params.busqueda; 
    const regex = new RegExp( busqueda, 'i' ); 
    
    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuarios.find({nombre : regex}),
        Medicos.find({ nombre : regex }),
        Hospitales.find({ nombre : regex })
    ])

    res.json({
           ok:true,
           usuarios, 
           medicos,
           hospitales 
       })
}



module.exports = {
    getTodo
}