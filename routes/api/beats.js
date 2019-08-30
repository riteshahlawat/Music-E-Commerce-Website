const express = require('express');
const router = express.Router();
const config = require("../../databaseConfig.js");

const connection = config.connection;

// Get all beats
router.get('/', (req, res) => {
    let sql = "SELECT * FROM beats";
    let query = connection.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});


module.exports = router;