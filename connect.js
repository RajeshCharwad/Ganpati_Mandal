const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mandal'
});

connection.connect(function(err) {
    if(err) {
        return console.error('error: '+err.message);
    }

    console.log('Connected successfully');
});

module.exports = connection;