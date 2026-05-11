const fs = require('fs');
const path = require('path');
const exe = require('../connection');

async function run() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '..', 'db', 'create_counter_table.sql'), 'utf8');
    await exe(sql);
    console.log('`counter` table created (or already exists).');
    process.exit(0);
  } catch (err) {
    console.error('Error creating counter table:', err);
    process.exit(1);
  }
}

run();
