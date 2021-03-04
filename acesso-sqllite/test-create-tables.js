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
  db.run(query, err => {
    if (err) {
      reject(err)
    }else{
      resolve()
    }
  })
})

const createTables = async() => {
  const db = await initDB('banquinho.sqlite3')
  await run(db, `
    CREATE TABLE categories (
      id INTEGER NOT NULL PRIMARY KEY,
      category TEXT
    );
  `)
  console.log('Categories table were created!');
  await run(db, `
    CREATE TABLE products (
      id INTEGER NOT NULL PRIMARY KEY,
      product TEXT,
      price REAL
    );
  `)
  console.log('Products table were created!');
  await run(db, `
    CREATE TABLE images (
      id INTEGER NOT NULL PRIMARY KEY,
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

createTables().catch(err => console.log(err))