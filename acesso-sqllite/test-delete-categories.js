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

const deleteCategories = async() => {
  const db = await initDB('banquinho.sqlite3')
  await run(db, `DELETE FROM categories WHERE id = ?;`, [4])
  console.log('Category DELETED!');
}

deleteCategories().catch(err => console.log(err))