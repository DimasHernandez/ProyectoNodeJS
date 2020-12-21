const express = require("express");
const router = express.Router();
const pooldb = require('../database')   //pooldb hace referewncia a la conexion de la BD


router.get('/', (req, res) =>{
    res.send('Hello World');
});

module.exports = router;
