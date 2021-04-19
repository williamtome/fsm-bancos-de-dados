const connection = require('./db')
const categories = require('./categories')(connection)
const products = require('./products')(connection)

const test = async() => {
  // console.log(await categories.findAll())
  // await categories.create('Smartphones')
  // await categories.remove(2)
  // console.log(await categories.update('Eletrônicos & Eletrodomésticos', 1))
  // console.log(await products.findAll());
  await products.create(['New product', 100])
  console.log(await products.findAllByCategory(4));
}

test()