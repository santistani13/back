const jwt = require('jsonwebtoken');


const generar_jwt =  ( uid )=> {

return new Promise ((rej,res) => {
    const payload = {
        uid, 
    }
jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: '12h' }, 
          
(err, token) => {
    if (err) {
        console.log(err); 
        rej('No se pudo generar el jwt')
    }else {
        res(token); 
    }
});

})

   

}

module.exports = {
    generar_jwt
}