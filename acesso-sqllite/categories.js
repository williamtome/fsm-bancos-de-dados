const db = require('./db')

const init = database => {

  const create = async(data) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, `INSERT INTO categories (category) VALUES (?);`, data)
    console.log('Category created!');
  }
  
  const findAll = async() => {
    const dbConn = await db.init(database)
    const categories = await db.query(dbConn, `SELECT * FROM categories;`)
    console.log('Categories:', categories);
  }
  
  const remove = async(id) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, `DELETE FROM categories WHERE id = ?;`, id)
    console.log('Category DELETED!');
  }
  
  const update = async(data, id) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, `UPDATE categories SET category = ? WHERE id = ?;`, [data, id])
    console.log('Category updated!');
  }
  
  const findAllPaginate = async({ pageSize = 1, currentPage = 0 }) => {
    const dbConn = await db.init(database)
    const categories = await db.query(dbConn, `SELECT * FROM categories limit ${currentPage*pageSize}, ${pageSize+1};`)
    const hasNext = categories.length > pageSize
    
    if (categories.length > pageSize) 
      categories.pop()
    
    return {
      data: categories,
      hasNext
    }
  }

  return {
    findAll,
    findAllPaginate,
    create,
    update,
    remove
  }

}

module.exports = init