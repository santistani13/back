const { response } = require( 'express' );
const Hospital = require('../models/hospital'); 


const getHospitales = async ( req,res = response )=> {

    const hospitales = await Hospital.find().populate('usuario', 'nombre'); 
     res.json({
         ok:true,
        hospital: hospitales 
     })
}


const crearHospital =  async ( req,res = response )=> {
   
    const hospital = new Hospital( req.body ); 

    try {
    
        const hospitalDB = await hospital.save(); 

          res.json({
              ok: true, 
              hospital: hospitalDB 
          })
          
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false, 
            msg: 'Hable con el administrador'
        })
    }

    res.json({
        ok:true,
        msg: 'crearHospitales'
    })
}


const actualizarHospital = async ( req,res = response )=> {

    const id = req.params.id; 

     try {
       const hospitalDB = await Hospital.findById(id); 
       if (!hospitalDB){
         return  res.status(404).json({
               ok: false, 
               msg: 'Hospital no encontrado'
           })
       }     

       const cambiosHospital = {
           ...req.body
       }
      const cambiosActualizados = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true })

    res.json({
        ok:true,
        hospital:cambiosActualizados
    })
     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false, 
             msg: 'Error al actualizar'
         })
     }

}


const borrarHospital = async ( req,res = response )=> {
    const id = req.params.id; 

     try {
       const hospitalDB = await Hospital.findById(id); 
       if (!hospitalDB){
         return  res.status(404).json({
               ok: false, 
               msg: 'Hospital no encontrado'
           })
       }     

      
      await Hospital.findByIdAndDelete(id); 

    res.json({
        ok:true,
        msg:'Hospital eliminado'
    })
     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false, 
             msg: 'Error al eliminar'
         })
     }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital, 
    borrarHospital
} 