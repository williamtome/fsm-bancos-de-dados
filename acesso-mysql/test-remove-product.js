const mysql2 = require('mysql2/promise')

const test = async() => {

  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'catalog_products'
  })

  try {
    const productId = 2;
    const [results] = await connection.query('DELETE FROM products WHERE id = ? LIMIT 1;', [productId]);
    console.log([results])
  } catch (err) {
    console.error('ERRO: ', err)
  }

}

test()