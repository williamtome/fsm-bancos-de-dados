const mysql2 = require('mysql2/promise')

const test = async() => {

  const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'catalog_products'
  })

  try {
    const data = ['categoria atualizada', 2]
    const [results] = await connection.execute(
      'UPDATE categories SET category = ? WHERE id = ?;',
      data
    )
    console.log([results])
  } catch (err) {
    console.error('ERRO: ', err)
  }

}

test()