const mysql2 = require('mysql2/promise')

const test = async() => {

  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'catalog_products'
  })

  try {
    categoryId = 2;
    const [results] = await connection.query(
      `SELECT * FROM products WHERE id IN (
        SELECT product_id from categories_products WHERE category_id = ?
      )`, [categoryId])
    
    console.log([results])
  } catch (err) {
    console.error('ERRO: ', err)
  }

}

test()