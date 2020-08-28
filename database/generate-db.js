(async () => {

    const {
        Client,
        Pool
    } = require('pg')
    const config = require("../config")

    let pool = new Pool({
        user: config.pg_user,
        host: "127.0.0.1",
        database: "template1", // Do not edit this
        password: config.pg_pass,
        port: 5432
    })

    pool.on('error', (e) => {
        console.error('Error:', e)
    })


    await pool.query(`CREATE DATABASE ${config.pg_db}`).catch(() => {})

    let db = new Pool({
        user: config.pg_user,
        host: "127.0.0.1",
        database: config.pg_db, // Do not edit this
        password: config.pg_pass,
        port: 5432
    })

    /*
     TYPES:
          JSON[]: Array,
          JSON: JSON (Object),
          TEXT: String,
          INT: Number,
          There are too many....

    OPTIONS:
         NOT NULL: The value can't be null or else you'll get an error,
         PRIMARY KEY: Unique value,
         There are too many....

     */

    await db.query(`CREATE TABLE guilds (id TEXT NOT NULL PRIMARY KEY, prefix TEXT, language TEXT NOT NULL, blacklisted BOOLEAN)`);
    await db.query(`CREATE TABLE users (id TEXT NOT NULL PRIMARY KEY, cooldowns JSON, economy JSON, blacklisted BOOLEAN)`);

    await console.log("OK")
    await process.exit(1);
})()
