const exe = require("./connection");

(async () => {
  try {
    console.log("\n=== MACHINE TABLE STRUCTURE ===");
    const cols = await exe("SHOW COLUMNS FROM machine");
    cols.forEach(c => {
      console.log(`  ${c.Field} (${c.Type}) ${c.Null === 'NO' ? 'NOT NULL' : 'NULL'}`);
    });

    console.log("\n=== FIRST 3 MACHINE ROWS ===");
    const machines = await exe("SELECT * FROM machine LIMIT 3");
    machines.forEach((m, i) => {
      console.log(`\nRow ${i + 1}:`);
      Object.keys(m).forEach(key => {
        console.log(`  ${key}: ${m[key]}`);
      });
    });

    console.log("\n=== RAW JSON ===");
    console.log(JSON.stringify(machines, null, 2));

    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
})();
