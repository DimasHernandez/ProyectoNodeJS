const express = require('express');
const router = express.Router();
const pool = require('../database');   //pool es la conexión a la base de datos

router.get('/add', (req, res) =>{
    res.render('links/add');
});

router.post('/add', async (req, res) =>{    //async es para que funcione await que es asincrona
    const {title, url, description} = req.body;   //Destructuring desde este objeto se adquiere las propiedad title, url, description
    const newLink = {               // Creamos este objeto para enlzar o relacionarlo con un Usuario
        title,
        url,
        description,
    };
    //console.log(newLink);
    pool.query('INSERT INTO links SET ?', [newLink], function(){
        console.log(req.body);
    });
    //await pool.query('INSERT INTO links (title, url, description) VALUES (?,?,?) ?', [newLink]) //await toma su tiempo hasta que se haga la petición en la base de datos, es decir, el codigo no se detiene aca y espera hasta que termine, sino que sigue.
    //await pool.query('INSERT INTO links set ?', [newLink]);
    //console.log(req.body);
    res.send('Received');
});

module.exports = router;