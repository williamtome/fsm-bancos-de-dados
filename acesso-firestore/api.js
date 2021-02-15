const categories = require('./categories');

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

  const cat = await categories.findAll()
  console.log(cat);
}

testes()



