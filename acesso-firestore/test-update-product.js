const admin = require('firebase-admin');

const serviceAccount = require('./firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const productId = 'K8j3P9ag61ywv8u7xyOp'

const categoryRef = db.collection('categories').doc('duiQuEoh4JHJtPXPnQLt')

const product = db.collection('products').doc(productId)

product.update({
  product: 'Smartphone Samsung A11',
  price: 1049,
  categories: admin.firestore.FieldValue.arrayUnion(categoryRef)
})
.then(snap => console.log(snap))