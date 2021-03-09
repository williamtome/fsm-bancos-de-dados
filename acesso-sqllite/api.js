const categories = require('./categories')

const test = async() => {
  await categories.findAll();
  await categories.create('Decoração')
  await categories.remove(1)
  await categories.update('Informática', 5)
  console.log('cp 0:',await categories.findAllPaginate({ pageSize: 2, currentPage: 0 }));
  console.log('cp 1:',await categories.findAllPaginate({ pageSize: 2, currentPage: 1 }));
  console.log('cp 2:',await categories.findAllPaginate({ pageSize: 2, currentPage: 2 }));
}

test().catch(err => console.log(err))