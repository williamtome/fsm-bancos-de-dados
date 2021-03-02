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

  const productsWithImages = []

  for await(product of products) {
    const imgs = []
    const imgDB = await db.collection('products')
                      .doc(product.id)
                      .collection('images')
                      .get()
    
    imgDB.forEach(img => {
      imgs.push({
        ...img.data(),
        id: img.id
      })
    })

    productsWithImages.push({
      ...product,
      imgs
    })

  }

  return productsWithImages
}

const findAllPaginate = async({ pageSize = 1, startAfter = '' }) => {
  const productsDB = await db
                      .collection('products')
                      .orderBy('category')
                      .limit(pageSize+1)
                      .startAfter(startAfter)
                      .get()

  if (productsDB.empty) {
    return {
      data: [],
      total: 0
    }
  }

  const products = []
  let total = 0
  
  productsDB.forEach(category => {
    if (total < pageSize) {
      products.push({
        ...category.data(),
        id: category.id
      })
    } 
    total++
  })

  const productsWithImages = []

  for await(product of products) {
    const imgs = []
    const imgDB = await db.collection('products')
                      .doc(product.id)
                      .collection('images')
                      .get()
    
    imgDB.forEach(img => {
      imgs.push({
        ...img.data(),
        id: img.id
      })
    })

    productsWithImages.push({
      ...product,
      imgs
    })

  }
  
  return {
    data: productsWithImages,
    total: products.length,
    hasNext: total > pageSize,
    startAfter: total > pageSize ? products[products.length-1].category : ''
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

const addImage = async(id, data) => {
  const imageRef = db
    .collection('products')
    .doc(id)
    .collection('images')
    .doc()

  await imageRef.set(data)
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
  remove,
  addImage
}