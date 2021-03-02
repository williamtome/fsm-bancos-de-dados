const categories = require('./categories');
const products = require('./products');

const testes = async() => {
  // await categories.create({
  //   category: 'NOva categoria'//'Categoria criada via código'
  // })
  
  // await categories.remove('SotozMdvPRSRsjaTS8vZ').then(res => {
  //   console.log('Categoria removida.');
  // })

  // await categories.update('8V2v7jqEd5XpUi6eCojn', {
  //   category: 'Novo nome da categoria'
  // })
  // const cat = await categories.findAll()

  // const cat = await categories.findAllPaginate({})
  // console.log(cat);

/*  await products.create({
    product: 'Novo produto2',
    price: 797,
    categories: ['8V2v7jqEd5XpUi6eCojn']
  })*/
  
  /*await products.update('8am8ykeuv3qxFygZXTZx', {
    product: 'Novo produto2',
    price: 797,
    categories: ['duiQuEoh4JHJtPXPnQLt']
  })*/
  //products.remove('4bKsa1HMIAfT7gFb16su')

  // await products.addImage('UN1qS1knXSGx2IczbQWT', {description: 'Nova imagem', url: 'url'})
  const prods = await products.findAllPaginate({pageSize: 1, startAfter: ''})
  // const prods = await products.findAll()
  console.log(prods);

}

testes()



