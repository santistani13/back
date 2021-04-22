const { Schema, model } = require( 'mongoose' );

const MedicosSchema = Schema ({

    nombre: {
           type: String, 
           require: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref:'Hospital',
        require: true 
    }
}); 

MedicosSchema.method('toJSON', function (){
    const { __v,...object} = this.toObject();
    return object;  
})

module.exports = model('Medicos', MedicosSchema); 










