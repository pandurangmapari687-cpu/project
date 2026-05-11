var mysql = require("mysql2");
var util = require("util");

var conn = mysql.createConnection({
    host: "b4nkgvldy3xonfkrw5jf-mysql.services.clever-cloud.com",
    user: "ud9ryvzqmockke29",
    password: "JpeEfx5PxImtHkCWu72V",
    database: "b4nkgvldy3xonfkrw5jf",
    port: 3306
});

conn.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;