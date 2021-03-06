const db = require('./db')

const create = async(data) => {
  const dbConn = await db.init('./banquinho.sqlite3')
  await db.queryWithParams(dbConn, `INSERT INTO categories (category) VALUES (?);`, data)
  console.log('Category created!');
}

const findAll = async() => {
  const dbConn = await db.init('./banquinho.sqlite3')
  const categories = await db.query(dbConn, `SELECT * FROM categories;`)
  console.log('Categories:', categories);
}

module.exports = {
  findAll,
  // findAllPaginate,
  create,
  // update,
  // remove
}