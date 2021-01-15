const admin = require('firebase-admin');

const serviceAccount = require('./firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const productId = 'D3zbkoXSTa6T8iL3H9n3'

const imageRef = db
  .collection('products')
  .doc(productId)
  .collection('images')
  .doc()

imageRef
  .set({
    description: 'my description',
    url: 'my image url'
  }).then(res => console.log(res))
