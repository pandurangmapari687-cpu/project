const fs = require("fs");
const exe = require("../connection");

const sql = fs.readFileSync("./db/create_service_table.sql", "utf-8");

exe(sql)
  .then(() => {
    console.log("✅ Service table created successfully!");
  })
  .catch((err) => {
    console.error("❌ Error creating service table:", err);
  });
