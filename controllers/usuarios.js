const Usuarios = require('../models/usuarios');
const { response } = require('express'); 
const bcrypt = require( 'bcryptjs' ); 
const { generar_jwt } = require('../helpers/jwt'); 

const getUsuarios = async ( req, res ) => {
      
    const desde = Number(req.query.desde) || 0; 
    
    const [ usuarios, total ] = await Promise.all([
                    Usuarios.find()
                             .skip(desde)
                             .limit(5),
                    Usuarios.countDocuments()          
    ])
    

    res.json( {
        ok: true,
        usuarios,
        total
    } )
}

const crearUsuarios = async ( req, res = response ) => {

    const { password, email } = req.body

    
    try {
        const existeEmail = await Usuarios.findOne({ email });
        if(existeEmail){
            return  res.status( 400 ).json({
                ok: false,
                msg: 'El mail ya esta registrado'
            })
        }

        const usuario = new Usuarios(req.body);  
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
         usuario.password = bcrypt.hashSync( password, salt ); 
      
        //Guardar usuario 
        await usuario.save();
        //Generar token
     //   const token = await generar_jwt( usuario._id ); 

           
       res.json( {
   
           ok: true,
           usuario,
          // token 
       } );

    } catch( error ){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revise sus logs'
        })

    }
    
}

actualizarUsuario = async ( req, res = response ) => {
     
     const uid = req.params.id; 

    try{
          const usuarioDb = await Usuarios.findById(uid);

          if (!usuarioDb){
              return res.status(404).json({
                  ok: false,
                  msg: 'No se encontro ningun usuario con ese id'
              })
          }
          
          //Actualizaciones 
          const campos = req.body; 

          if ( usuarioDb.email === req.body.email ){
              delete campos.email; 
          }else{
              const existeEmail = await Usuarios.findOne({ email: req.body.email })
              if( existeEmail ){
                  return res.status(400).json({
                      ok: false,
                      msg: 'Ya existe email'
                  })
              }
          }

          delete campos.password; 
          delete campos.google; 

          const usuarioActualizado = await Usuarios.findByIdAndUpdate( uid, campos, { new: true } ); 
          res.json({
              ok: true, 
              usuario: usuarioActualizado
          })

    }catch(error){
        console.log(error); 
        res.status(500).json({
            ok: false, 
            msg: 'Error inesperado'
        })

    }


}

const eliminarUsuario =  async ( req, res = response) => {

    const uid = req.params.id; 
    try{
        const usuarioDb = await Usuarios.findById(uid);

          if (!usuarioDb){
              return res.status(404).json({
                  ok: false,
                  msg: 'No se encontro ningun usuario con ese id'
              })
          }
          
          await Usuarios.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado' 
        })
    }catch(error){
        console.log(error); 
        res.status(500).json({
            ok:false, 
            msg: 'Error inesperado'
        })
    }
   


}

module.exports = {
    getUsuarios, 
    crearUsuarios,
    actualizarUsuario,
    eliminarUsuario 
}