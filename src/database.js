//Conexion con la BD

const mysql = require('mysql');
const { database } = require('./keys');

const pool = mysql.createPool(database);
const { promisify } = require('util');

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){  //CONEXION DE LA BASE DE DATOS FUE PERDIDA
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){ //Comprobar cuantas conexiones tiene la base de datos
            console.error('DATABASE WAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){ //Si la conexion de la base de datos fue rechazada.
            console.error('DATABASE WAS REFUSED');
        }
    }
    if(connection) if(connection) connection.release();
        console.log('DB is Connected...');
        return; 
    
});

//Promisify
pool.query = promisify(pool.query);

module.exports = pool;