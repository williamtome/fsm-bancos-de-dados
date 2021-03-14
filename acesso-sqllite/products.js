const db = require('./db')

const init = database => {

  const create = async(data) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, `INSERT INTO products (product, price) VALUES (?, ?);`, data)
    console.log('product created!');
  }
  
  const addImage = async(data, productId) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, `INSERT INTO images (description, url, product_id) VALUES (?, ?, ?)`, [...data, productId])
    console.log('Image for product created!');
  }

  const findAll = async() => {
    const dbConn = await db.init(database)
    const products = await db.query(dbConn,'SELECT * FROM products')
    const condition = products.map(product => product.id).join(', ')
    const images = await db.query(dbConn,'select * from images where product_id in ('+condition+') GROUP BY product_id')
    const mapImages = images.reduce((prev, current) => {
      return {
        ...prev,
        [current.product_id]: current
      }
    }, {})

    const productsWithImages = products.map(product => {
      return {
        ...product,
        image: mapImages[product.id]
      }
    })
    console.log('products:', productsWithImages);
  }

  const findAllImages = async() => {
    const dbConn = await db.init(database)
    const images = await db.query(dbConn, `SELECT * FROM images;`)
    console.log('images:', images);
  }
  
  const remove = async(id) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, `DELETE FROM products WHERE id = ?;`, id)
    await db.queryWithParams(dbConn, `DELETE FROM images WHERE product_id = ?;`, id)
    await db.queryWithParams(dbConn, `DELETE FROM categories_products WHERE product_id = ?;`, id)
    console.log('product DELETED!');
  }
  
  const update = async(data, id) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, `UPDATE products SET product = ?, price = ? WHERE id = ?;`, [...data, id])
    console.log('product updated!');
  }

  const updateCategories = async(id, categories) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, `DELETE FROM categories_products WHERE product_id = ?;`, id)
    for await(const category of categories)
      await db.queryWithParams(dbConn, `INSERT INTO categories_products (category_id, product_id) VALUES (?, ?);`, [category, id])
  }
  
  const findAllPaginate = async({ pageSize = 1, currentPage = 0 }) => {
    const dbConn = await db.init(database)
    const products = await db.query(dbConn, `SELECT * FROM products limit ${currentPage*pageSize}, ${pageSize+1};`)
    const hasNext = products.length > pageSize

    if (products.length > pageSize) 
      products.pop()

    const condition = products.map(product => product.id).join(', ')
    const images = await db.query(dbConn,'select * from images where product_id in ('+condition+') GROUP BY product_id')
    const mapImages = images.reduce((prev, current) => {
      return {
        ...prev,
        [current.product_id]: current
      }
    }, {})

    const productsWithImages = products.map(product => {
      return {
        ...product,
        image: mapImages[product.id]
      }
    })

    
    return {
      data: productsWithImages,
      hasNext
    }
  }

  return {
    findAll,
    findAllPaginate,
    findAllImages,
    create,
    addImage,
    update,
    updateCategories,
    remove
  }

}

module.exports = init