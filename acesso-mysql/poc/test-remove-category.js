const mysql2 = require('mysql2/promise')

const test = async() => {

  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'catalog_products'
  })

  try {
    const categoryId = 3;
    const [results] = await connection.query('DELETE FROM categories WHERE id = ? LIMIT 1;', [categoryId]);
    console.log([results])
  } catch (err) {
    console.error('ERRO: ', err)
  }

}

test()