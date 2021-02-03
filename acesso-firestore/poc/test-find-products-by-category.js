const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const categoryRef = db.collection('categories').doc('duiQuEoh4JHJtPXPnQLt')

const products = db
  .collection('products')
  .where('categories', 'array-contains', categoryRef)
  .get()

products.then(snap => {
  console.log('is empty', snap.empty);
  snap.forEach(doc => {
    console.log('ID: ', doc.id, ' => ', doc.data());
    db.collection('products')
      .doc(doc.id)
      .collection('images')
      .get()
      .then(imgSnap => {
        imgSnap.forEach(img => {
          console.log('ID Img: ',img.id, ' ==> ', img.data());
        })
      })
  })
})
