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

const updateProducts = async() => {
  const db = await initDB('banquinho.sqlite3')
  await run(db, `UPDATE products SET product = ? WHERE id = ?;`, ['produto 1 atualizado', 1])
  console.log('Product updated!');
}

updateProducts().catch(err => console.log(err))