const admin = require('firebase-admin');

const serviceAccount = require('./firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const categoryRef = db.collection('categories').doc('duiQuEoh4JHJtPXPnQLt')

const doc = db.collection('products').doc()

doc.set({
  product: 'Smartphone Samsung',
  price: 990,
  categories: [categoryRef]
})
.then(snap => console.log(snap))