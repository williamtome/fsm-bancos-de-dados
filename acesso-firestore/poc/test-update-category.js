const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const doc = db.collection('categories').doc('NiWPSSYvCcPdwxoY3qYw')

doc.update({
  category: 'Novo nome da categoria'
})
.then(value => console.log(value))