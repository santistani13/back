const { response } = require( 'express' );
const Usuarios = require('../models/usuarios');
const bcrypt = require( 'bcryptjs' ); 
const { generar_jwt } = require('../helpers/jwt'); 
const { verify } = require('../helpers/google-verify');

const login =  async (req, res = response) => {
     
    const { email, password } = req.body; 
     

     try {
          //verificar email
     const usuarioDB = await Usuarios.findOne({ email });
     if ( !usuarioDB ){
         res.status(404).json({
             ok: false, 
             msg: 'Email no valido'
         })
     }
     //verificar contraseña 
     const validPassword = bcrypt.compareSync( password, usuarioDB.password ); 
     if( !validPassword ){
         res.status(400).json({
             ok: false, 
             msg: 'Contraseña no valida'
         })
     }

      // generar token
      // const token = await generar_jwt( usuarioDB._id ); 

      res.json({
            ok: true,
         //   token 
        })
         
     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false, 
             msg: 'Error inesperado en auth.js'
         })
     }

}

const googleSignIn = async (req, res = response) => {
      
    const googleToken = req.body.token; 
     const { name, email, picture } = await verify( googleToken ); 

     try {
         const usuarioDB = await Usuarios.findOne({email}); 
         let usuario; 
         
         if (!usuarioDB){
             //si no existe el usuario
             usuario = new Usuarios({
                 nombre: name,
                 email, 
                 password: '@@@',
                 img: picture, 
                 google: true 
             })

         }else{
             //si existe el usuario 
             usuario = usuarioDB; 
             usuario.google = true; 
         }

          await usuario.save();

        res.json({
            ok: true, 
            msg: 'Google sign in',
            usuario
        })
     } catch (error) {
         console.log(error)
        res.status(401).json({
            ok: false, 
            msg: 'Token no es correcto'
        })
     }



}



module.exports = {
    login,
    googleSignIn
}