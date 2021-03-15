const sqlite = require('sqlite3').verbose()

const openDatabase = databaseFile => new Promise((resolve, reject) => {
  const db = new sqlite.Database(databaseFile, (err) => {
    if (err) {
      reject(err)
    }else{
      resolve(db)
    }
  })
})

const run = (db, query) => new Promise((resolve, reject) => {
  db.run(query, err => {
    if (err) {
      reject(err)
    }else{
      resolve()
    }
  })
})

const init = async(databaseFile) => {
  const db = await openDatabase(databaseFile)
  // checa se o banco já está criado
  const exists = await query(db, `SELECT name FROM sqlite_master WHERE type = 'table' and name = 'categories'`)
  if (exists.length === 0) {
    await run(db, `
      CREATE TABLE categories (
        id INTEGER AUTOINCREMENT PRIMARY KEY,
        category TEXT
      );
    `)
    console.log('Categories table were created!');
    await run(db, `
      CREATE TABLE products (
        id INTEGER AUTOINCREMENT PRIMARY KEY,
        product TEXT,
        price REAL
      );
    `)
    console.log('Products table were created!');
    await run(db, `
      CREATE TABLE images (
        id INTEGER AUTOINCREMENT PRIMARY KEY,
        description TEXT,
        url TEXT,
        product_id INTEGER REFERENCES products(id)
      );
    `)
    console.log('Images table were created!');
    await run(db, `
      CREATE TABLE categories_products (
        category_id INTEGER REFERENCES categories(id),
        product_id INTEGER REFERENCES products(id)
      );
    `)
    console.log('Categories Products table were created!');
  }
  console.log(exists);
  return db
}

const queryWithParams = (db, query, values) => new Promise((resolve, reject) => {
  db.run(query, values, err => {
    if (err) {
      reject(err)
    }else{
      resolve()
    }
  })
})

const query = (db, query) => new Promise((resolve, reject) => {
  db.all(query, (err, rows) => {
    if (err) {
      reject(err)
    }else{
      resolve(rows)
    }
  })
})


module.exports = {
  init,
  query,
  queryWithParams,
}