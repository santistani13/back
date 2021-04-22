const { response } = require( 'express' );
const Medicos = require('../models/medicos');


const getMedicos =  async ( req, res = response )=> {
   
      const medicos = await Medicos.find().populate('usuario', 'nombre').populate('hospital', 'nombre img');

     res.json({
         ok:true,
         medicos: medicos
     })
}


const crearMedico = async ( req,res = response )=> {
    
     
    const medico = new Medicos( req.body); 


     try {
       
         const medicoDB = await medico.save(); 

        res.json({
            ok:true,
           medico: medicoDB
        })
     } catch (error) {
         res.status(500).json({
             ok: false, 
             msg: 'Error inesperado'
         })
     }
  
}


const actualizarMedico = async ( req,res = response )=> {
      
    const id = req.params.id; 

    
     try {
        const medico = await Medicos.findById(id);
        if (!medico){
            return res.status(404).json({
                ok: false, 
                msg: 'No existe ningun medico con ese id'
            })
        }
      
        const cambiosMedicos = {
            ...req.body
        }
        const cambiosActualizados = await Medicos.findByIdAndUpdate(id, cambiosMedicos, {new: true}); 

        res.json({
            ok:true,
           medico: cambiosActualizados
        })
   } catch (error) {
           console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar medico'
        })
       }
  
}


const borrarMedico = async ( req,res = response )=> {
    const id = req.params.id; 

    
    try {
       const medico = await Medicos.findById(id);
       if (!medico){
           return res.status(404).json({
               ok: false, 
               msg: 'No existe ningun medico con ese id'
           })
       }
     
     await Medicos.findByIdAndDelete(id); 

       res.json({
           ok:true,
          msg: 'Medico eliminado'
       })
  } catch (error) {
          console.log(error);
       res.status(500).json({
           ok:false,
           msg: 'Error al eliminar medico'
       })
      }
}

module.exports = {
   getMedicos,
   crearMedico,
   actualizarMedico,
   borrarMedico
} 


