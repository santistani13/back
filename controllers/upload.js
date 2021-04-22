const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarDB } = require("../helpers/actualizarArchivo");
const path = require('path');
const fs = require('fs'); 

const uploadFile = ( req, res = response ) =>{
       
   const tipo = req.params.tipo; 
   const id = req.params.id; 
    //validar tipo
    const validarTipo = ['usuarios', 'hospitales', 'medicos' ];
    if( !validarTipo.includes(tipo) ){
        res.status(400).json({
            ok:false,
            msg: 'No existe ese tipo de busqueda'
        })
    }
    //validar si hay archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false, 
            msg: 'No se subio ningun archivo'
        });
      }
      //procesar archivo
      const file = req.files.imagen

      const nombreCortado = file.name.split('.')//imagen1.3.jpg
      const extensionArchivo = nombreCortado[ nombreCortado.length -1 ]; 
      //validar extension
      const extensionValida = [ 'jpg', 'jpeg', 'png', 'gif' ];
      if( !extensionValida.includes(extensionArchivo) ){
          return res.status(400).json({
              ok: false, 
              msg: 'Extension del archivo no permitida'
          })
      }
    //generar nombre del archivo 
    const nombreArchivo = `${ uuidv4() }.${extensionArchivo}`; 

    //path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //mover la imagen
    file.mv(path, (err) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: false, 
                msg: 'No se ha podido mover el archivo'
            })
        }
    //actualizar base de datos
    actualizarDB( tipo, id, nombreArchivo ); 


        res.json({
            ok:true,
            msg: 'Archivo guardado!',
            nombreArchivo
        })
    })

}

 const retornarImagen = ( req, res = response ) => {
     const tipo = req.params.tipo; 
     const foto = req.params.foto; 

     const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}` ); 
     if (fs.existsSync(pathImg)){
         res.sendFile(pathImg); 
     }else{
         const pathImg = path.join( __dirname, '../uploads/no-img.jpg' ); 
         res.sendFile(pathImg); 
     }
 }

module.exports = {
    uploadFile,
    retornarImagen 
}