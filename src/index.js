const express = require("express");
const morgan = require("morgan");
const exphbl = require("express-handlebars");
const path = require('path');

//Inicializamos express
const app = express();

//Settings- Inicializamos el Puerto
app.set('port', process.env.PORT || 4000);
    
    //Se crea las rutas de las carpetas.
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbl({
    defaultLayout: 'main',
    layoutsDir : path.join(app.get('views'), 'layouts'),
    partialsDir : path.join(app.get('views'), 'partials'),
    extname : '.hbs',
    helpers : require('./lib/handlebars'),
}));
app.set('view engine', '.hbs');
app.use(express.urlencoded({extended : false}));
app.use(express.json());


//Middleware
app.use(morgan('dev')); //Esto se hace para tomar un registro de lo que se realiza en la Pagina Web

//Variables Globales
//El servidor recibe y responde solicitudes, el next es para que avance y entre a la siguiente funcion
app.use((req, res, next) =>{
    next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the Server
app.listen(app.get('port'), () =>{
    console.log('Server on Port', app.get('port'));
});