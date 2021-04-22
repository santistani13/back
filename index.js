const express = require( 'express' );

require('dotenv').config();
const cors = require('cors'); 
const { dbConnection } = require( './database/config' ); 

//creando el servidor express

const app = express();

//configurar CORS
app.use(cors());

//leer body
app.use( express.json() );

// Base de datos 
dbConnection(); 
//directorio publico
app.use(express.static('public')); 
//rutas

app.use('/api/usuarios', require( './routes/usuarios' )); 
app.use('/api/login', require( './routes/auth' )); 
app.use('/api/hospitales', require('./routes/hospitales')); 
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/todo'));
app.use('/api/upload', require('./routes/upload')); 


app.listen( process.env.PORT, () => {
    console.log( 'Servidor corriendo en puerto ' + process.env.PORT  );  
} )









