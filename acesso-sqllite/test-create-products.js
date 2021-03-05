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

const run = (db, query, values) => new Promise((resolve, reject) => {
  db.run(query, values, err => {
    if (err) {
      reject(err)
    }else{
      resolve()
    }
  })
})

const createProducts = async() => {
  const db = await initDB('banquinho.sqlite3')
  await run(db, `INSERT INTO products (product, price) VALUES (?, ?);`, ['SmartTv Sony', 1499])
  // await run(db, `INSERT INTO categories_products (category_id, product_id) VALUES (?, ?);`, [1, 1])
  console.log('Product created!');
}

createProducts().catch(err => console.log(err))