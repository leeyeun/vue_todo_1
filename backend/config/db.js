var mysql = require('mysql');
const db = mysql.createPool({
    host : 'localhost',
    port : 3306,
    user: 'root',
    password: '@dldhfsu0109',
    database: 'vue_todo',
    timezone: '+09:00'
});

module.exports = db;