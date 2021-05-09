const mysql = require('mysql')

// Database connection settings
const connectionSettings = {
    host:       'localhost',
    user:       'root',
    password:   'root',
    database:   'car_configurator'
};

// Establish a connection
let connection = mysql.createConnection(connectionSettings);

connection.connect(function(error){
    if(error) throw error;
    else console.info('Connection to database succeeded')
});

module.exports = connection;