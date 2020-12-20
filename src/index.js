const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require('path');

//Inicializamos express
const app = express();

//Settings- Inicializamos el Puerto
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout : 'main',
    layoutsDir : path.join(app.get('views'), 'layouts'),
    partialsDir : path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middleware
app.use(morgan('dev')); //Esto se hace para tomar un registro de lo que se realiza en la Pagina Web
app.use(express.urlencoded({extended: false})); 
app.use(express.json());


//Variables Globales
//Toma info del usuario, lo que quiero responder y continua con la función
app.use((req, res, next) =>{  
    
    next();
});

//Routes
app.use(require('./routes/index.js'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));


//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the Server
app.listen(app.get('port'), () =>{
    console.log('Server on Port', app.get('port'));
});