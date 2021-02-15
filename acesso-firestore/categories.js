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
  create,
  update,
  remove
}