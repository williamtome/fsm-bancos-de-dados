const init = connection => {

  const findAll = async() => {
    const conn = await connection
    const [results] = await conn.query('SELECT * FROM categories;')
    return results
  }

  const create = async(data) => {
    const conn = await connection
    await conn.execute('INSERT INTO categories (category) VALUES (?);', [data])
  }

  return {
    create,
    findAll
  }
}

module.exports = init
