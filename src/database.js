const mysql = require('mysql');

const{database} = require('./keys');

const pool = mysql.createPool(database);
const {promisify} = require('util');

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){    //Conexion con la BAse de datos fue perdida
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){          //Comprobar cuantas conexiones tiene la base de datos hasta el momento
            console.error('DATABASE WAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){                //Cuando vayamos hacer con la base de datos y la conexión es rechazada
            console.error('DATABASE WAS REFUSED');
        }
    }
    if(connection) connection.release();
        console.log('DB is Connected');
        return;
});

//Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;