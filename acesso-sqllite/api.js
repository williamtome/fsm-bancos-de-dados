const categories = require('./categories')('./banquinho.sqlite3')
const products = require('./products')('./banquinho.sqlite3')

const test = async() => {
  // await categories.findAll();
  // await categories.create('Decoração')
  // await categories.remove(1)
  // await categories.update('Decoração 2', 7)
  // console.log('cp 0:',await categories.findAllPaginate({ pageSize: 2, currentPage: 0 }));
  // console.log('cp 1:',await categories.findAllPaginate({ pageSize: 2, currentPage: 1 }));
  // console.log('cp 2:',await categories.findAllPaginate({ pageSize: 2, currentPage: 2 }));

  // await products.create(['Produto 2', 128]);
  // await products.addImage(['imagen do produto 2', 'url/produto2.png'], 4)
  // await products.update(['Produto 1 editado', 80], 2);
  // await products.remove(3)
  // await products.findAll()
  await products.findAllByCategory(2)
  // await products.updateCategories(2, [2, 2]);
  // console.log('cp 0:',await products.findAllPaginate({ pageSize: 2, currentPage: 0 }));
}

test().catch(err => console.log(err))