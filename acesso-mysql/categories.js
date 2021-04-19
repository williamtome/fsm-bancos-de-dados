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

  const remove = async(categoryId) => {
    const conn = await connection
    await conn.execute('DELETE FROM categories WHERE id = ? LIMIT 1;', [categoryId])
  }

  return {
    create,
    remove,
    findAll
  }
}

module.exports = init
