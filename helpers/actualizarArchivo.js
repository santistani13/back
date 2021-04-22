const Usuarios = require('../models/usuarios');
const Medicos = require('../models/medicos');
const Hospitales = require('../models/hospital');
const fs = require('fs'); 



const actualizarDB = async ( tipo, id, nombreArchivo ) =>{
  
    let pathViejo = ''; 

    switch (tipo) {
        case 'medicos':
            const medico = await Medicos.findById(id);
            if(!medico){
                return false; 
            }
             pathViejo = `./uploads/medicos/${medico.img}`
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);                
            }
            medico.img = nombreArchivo; 
            await medico.save(); 
            return true; 
            break;
        case 'usuarios': 
        const usuario = await Usuarios.findById(id);
            if(!usuario){
                return false; 
            }
             pathViejo = `./uploads/usuarios/${usuario.img}`
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);                
            }
            usuario.img = nombreArchivo; 
            await usuario.save(); 
            return true; 
        break; 

        case 'hospitales':
            const hospital = await Hospitales.findById(id);
            if(!hospital){
                return false; 
            }
             pathViejo = `./uploads/hospitales/${hospital.img}`
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);                
            }
            hospital.img = nombreArchivo; 
            await hospital.save(); 
            return true; 
        break; 

        default: 
            break;
    }
}

module.exports = {
    actualizarDB
}
