const mysql = require('mysql')

const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "dev_web_database",
    timezone: "T00:00:00.000Z",
    multipleStatements: true,
}

module.exports = mysql.createConnection(config);