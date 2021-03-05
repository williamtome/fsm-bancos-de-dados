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
  db.all(query, values, (err, rows) => {
    if (err) {
      reject(err)
    }else{
      resolve(rows)
    }
  })
})

const listProducts = async() => {
  const db = await initDB('banquinho.sqlite3')
  const catId = 1
  const products = await run(db, `
    SELECT * FROM products WHERE id IN(
      select product_id from categories_products where category_id = ?
    );
  `, [catId])
  console.log('Products:', products);
}

listProducts().catch(err => console.log(err))