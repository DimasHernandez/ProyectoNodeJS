const express = require("express");
const morgan = require("morgan");

//Inicializamos express
const app = express();

//Settings- Inicializamos el Puerto
app.set('port', process.env.PORT || 4000);

//Middleware
app.use(morgan('dev')); //Esto se hace para tomar un registro de lo que se realiza en la Pagina Web

//Variables Globales


//Routes


//Public


//Starting the Server
app.listen(app.get('port'), () =>{
    console.log('Server on Port', app.get('port'));
});