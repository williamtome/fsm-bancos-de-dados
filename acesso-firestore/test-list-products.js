const admin = require('firebase-admin');

const serviceAccount = require('./firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const products = db.collection('products').get()

products.then(snapshot => {
  console.log('IS EMPTY ? ', snapshot.empty);
  snapshot.forEach(doc => {
    console.log('ID: ' + doc.id, ' => ', doc.data());
    db.collection('products')
      .doc(doc.id)
      .collection('images')
      .get()
      .then(imgSnapshot => {
        imgSnapshot.forEach(img => {
          console.log('IMG: ' + img.id, ' => ', 'Description: ', img.data().description, '- URL: ', img.data().url);
        })
      })
  })
})