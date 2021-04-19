const connection = require('./db')
const categories = require('./categories')(connection)

const test = async() => {
  console.log(await categories.findAll())
  // await categories.create('Smartphones')
  // await categories.remove(2)
  // console.log(await categories.update('Eletrônicos & Eletrodomésticos', 1))
}

test()