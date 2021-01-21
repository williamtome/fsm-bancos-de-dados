const admin = require('firebase-admin');

const serviceAccount = require('./firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const productId = 'D3zbkoXSTa6T8iL3H9n3'
const product = db.collection('products').doc(productId)

    db.collection('products')
      .doc(productId)
      .collection('images')
      .get()
      .then(imgSnapshot => {
        const exclusoes = []
        imgSnapshot.forEach(img => {
          console.log(img.id);
          exclusoes.push(db.collection('products').doc(productId).collection('images').doc(img.id).delete())
        })
        return Promise.all(exclusoes)
      })
      .then(() => {
        console.log('Imagens removidas com sucesso.');
        return product.delete()
      })
      .then(() => {
        console.log('Produto removido com sucesso.');
      })