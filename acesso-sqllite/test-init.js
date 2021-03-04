const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database('banquinho.sqlite3', (err) => {
  console.log(err);
})