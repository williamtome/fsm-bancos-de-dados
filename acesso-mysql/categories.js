const init = connection => {

  const findAll = async() => {
    const conn = await connection
    const [results] = await conn.query('SELECT * FROM categories;')
    return results
  }

  return {
    findAll
  }
}

module.exports = init
