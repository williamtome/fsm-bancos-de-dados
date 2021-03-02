const db = require('./firestore')
const admin = require('firebase-admin')

const findAll = async() => {
  const productsDB = await db.collection('products').get()

  if (productsDB.empty) {
    return []
  }

  const products = []

  productsDB.forEach(doc => {
    products.push({
      ...doc.data(),
      id: doc.id
    })
  })

  return products
}

const findAllPaginate = async({ pageSize = 1, startAfter = 'Novo nome da categoria' }) => {
  const categoriesDB = await db
                      .collection('categories')
                      .orderBy('category')
                      .limit(pageSize+1)
                      .startAfter(startAfter)
                      .get()

  if (categoriesDB.empty) {
    return {
      data: [],
      total: 0
    }
  }

  const categories = []
  let total = 0
  
  categoriesDB.forEach(category => {
    if (total < pageSize) {
      categories.push({
        ...category.data(),
        id: category.id
      })
    } 
    total++
  })
  
  return {
    data: categories,
    total: categories.length,
    hasNext: total > pageSize,
    startAfter: total > pageSize ? categories[categories.length-1].category : ''
  }
}

const create = async({ categories, ...data }) => {
  const doc = db.collection('products').doc()
  const categoriesRefs = categories.map(cat => db.collection('categories').doc(cat))
  await doc.set({
    ...data,
    categories: categoriesRefs
  })
}

const update = async(id, { categories, ...data }) => {
  const doc = db.collection('products').doc(id)
  const categoriesRefs = categories.map(cat => db.collection('categories').doc(cat))
  await doc.update({
    ...data,
    categories: admin.firestore.FieldValue.arrayUnion(...categoriesRefs)
  })
}

const remove = async(id) => {
  const doc = db.collection('products').doc(id)
  
  const images = await doc.collection('images').get()
  
  const exclusoes = []

  await images.forEach(img => {
    exclusoes.push(doc.collection('images').doc(img.id).delete())
  })

  await Promise.all(exclusoes)

  await doc.delete()
}

module.exports = {
  findAll,
  findAllPaginate,
  create,
  update,
  remove
}