const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pollDB',
    password: 'postgres',
    port: 5432,
})

module.exports = pool