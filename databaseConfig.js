const mysql = require('mysql');

// Create connection
config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: "singhsbeats"
};

const db = mysql.createConnection(config);
  
  // Connect
  db.connect((err) => {
    if(err) {
        throw err;
    } else {
        console.log("MySQL Connected...");
    }
  });

module.exports = {
    connection: mysql.createConnection(config)
}