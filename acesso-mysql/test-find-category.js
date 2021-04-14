const mysql2 = require('mysql2/promise')

const test = async() => {

  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'catalog_products'
  })

  try {
    const categoryId = 2;
    const [results] = await connection.execute('SELECT * FROM categories WHERE id = ?;', [categoryId]);
    console.log([results])
  } catch (err) {
    console.error('ERRO: ', err)
  }

}

test()