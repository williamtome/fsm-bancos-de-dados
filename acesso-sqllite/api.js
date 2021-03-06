const categories = require('./categories')

const test = async() => {
  // categories.create('Decoração')
  categories.findAll()
}

test().catch(err => console.log(err))