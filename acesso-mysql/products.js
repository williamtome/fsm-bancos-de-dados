
const init = connection => {

  const findAll = async() => {
    const conn = await connection
    const [products] = await conn.query('SELECT * FROM products;')
    return products
  }

  const create = async(data) => {
    const conn = await connection
    const [product] = await conn.execute('INSERT INTO products (product, price) VALUES (?,?);', data)
    await conn.execute('INSERT INTO categories_products (category_id, product_id) VALUES (?,?)',[4,product.insertId])
  }

  const remove = async(id) => {
    const conn = await connection
    await conn.execute('DELETE FROM products WHERE id = ? LIMIT 1;', [id])
  }

  const findAllByCategory = async(categoryId) => {
    const conn = await connection
    const [results] = await conn.query(
      `SELECT * FROM products WHERE id IN (
        SELECT product_id FROM categories_products WHERE category_id = ?
      )`, [categoryId]
    )
    return results
  }

  const update = async(data, id) => {
    const conn = await connection
    await conn.execute('UPDATE products SET product = ?, price = ? WHERE id = ?;', [data,id])
  }

  return {
    findAll,
    findAllByCategory,
    create,
    remove,
    update
  }
}

module.exports = init