const connection = require('./db')
const categories = require('./categories')(connection)

const test = async() => {
  console.log(await categories.findAll())
}

test()