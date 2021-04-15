const mysql2 = require('mysql2/promise')

const test = async() => {

  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'catalog_products'
  })

  try {
    const data = ['Geladeira', 997]
    const [results] = await connection.execute(
      'INSERT INTO products (product, price) VALUES (?,?);',
      data
    )
    console.log([results])
  } catch (err) {
    console.error('ERRO: ', err)
  }

}

test()