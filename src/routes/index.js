const express = require('express');
const router = express.Router();

const pooldb = require('../database')

router.get('/', (req, res) =>{
    res.send('Hello World');
});


//Exportamos Router
module.exports = router;