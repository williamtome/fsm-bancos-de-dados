const sqlite = require('sqlite3').verbose()

const initDB = databaseFile => new Promise((resolve, reject) => {
  const db = new sqlite.Database(databaseFile, (err) => {
    if (err) {
      reject(err)
    }else{
      resolve(db)
    }
  })
})

const run = (db, query) => new Promise((resolve, reject) => {
  db.all(query, (err, rows) => {
    if (err) {
      reject(err)
    }else{
      resolve(rows)
    }
  })
})

const listProducts = async() => {
  const db = await initDB('banquinho.sqlite3')
  const products = await run(db, `SELECT * FROM Products;`)
  console.log('Products:', products);
}

listProducts().catch(err => console.log(err))