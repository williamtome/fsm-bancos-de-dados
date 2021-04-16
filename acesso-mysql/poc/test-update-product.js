const mysql2 = require('mysql2/promise')

const test = async() => {

  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'catalog_products'
  })

  try {
    const data = ['Cama de casal', 1598, 4]
    const [results] = await connection.execute(
      'UPDATE products SET product = ?, price = ? WHERE id = ?;',
      data
    )
    console.log([results])
  } catch (err) {
    console.error('ERRO: ', err)
  }

}

test()