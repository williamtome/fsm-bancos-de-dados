const mysql2 = require('mysql2/promise')

const test = async() => {

  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'catalog_products'
  })

  try {
    const data = ['Sofá', 1200]
    const [results] = await connection.execute(
      'INSERT INTO products (product, price) VALUES (?,?);',
      data
    )
    await connection.execute(
      'INSERT INTO categories_products (category_id, product_id) VALUES (?,?)',[2,results.insertId]
    )
    console.log([results])
  } catch (err) {
    console.error('ERRO: ', err)
  }

}

test()