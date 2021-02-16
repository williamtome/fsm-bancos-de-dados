const db = require('./firestore')

const findAll = async() => {
  const categoriesDB = await db.collection('categories').get()

  if (categoriesDB.empty) {
    return []
  }

  const categories = []

  categoriesDB.forEach(doc => {
    categories.push({
      ...doc.data(),
      id: doc.id
    })
  })

  return categories
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

const create = async(data) => {
  const doc = db.collection('categories').doc()
  await doc.set(data)
}

const update = async(id, data) => {
  const doc = db.collection('categories').doc(id)
  await doc.update(data)
}

const remove = async(id) => {
  const doc = db.collection('categories').doc(id)
  await doc.delete()
}

module.exports = {
  findAll,
  findAllPaginate,
  create,
  update,
  remove
}