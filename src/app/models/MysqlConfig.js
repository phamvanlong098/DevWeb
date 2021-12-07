const mysql = require('mysql')

const config = {
    host: "localhost",
    user: "root",
    password: "depmaitenanh24",
    database: "devWeb_population",
    timezone: "T00:00:00.000Z"
}

module.exports = mysql.createConnection(config);