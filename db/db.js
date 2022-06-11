const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "lawalata010328",
  database: "permikaz",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
