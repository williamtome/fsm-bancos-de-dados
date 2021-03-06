const categories = require('./categories')

const test = async() => {
  // categories.create('Decoração')
  // categories.remove(1)
  categories.findAll()
}

test().catch(err => console.log(err))