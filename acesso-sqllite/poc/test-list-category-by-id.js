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
  db.get(query, values, (err, row) => {
    if (err) {
      reject(err)
    }else{
      resolve(row)
    }
  })
})

const listCategoriesById = async() => {
  const db = await initDB('banquinho.sqlite3')
  const categories = await run(db, `SELECT * FROM categories WHERE id = ?;`, [2])
  console.log(categories);
}

listCategoriesById().catch(err => console.log(err))