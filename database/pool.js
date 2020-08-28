const {
    Client,
    Pool
} = require('pg');

const pool = new Pool({
    user: global.client.config.pg_user,
    host: "127.0.0.1",
    database: global.client.config.pg_db,
    password: global.client.config.pg_pass,
    port: 5432
})

pool.on('error', (e) => {
    console.error(`Error at ${__dirname}:`, e);
})

console.log(chalk.yellow("----------------------------------------------------------------"));
console.log(global.chalk.blue("[DATABASE]") + ` successfully logged to the database as ${global.client.config.pg_user}`);


global.client.db.pool = pool;
module.exports = pool;
