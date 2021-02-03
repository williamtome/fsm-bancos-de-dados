const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const pageSize = 1

const categories = db
                    .collection('categories')
                    .orderBy('category')
                    .limit(pageSize+1)
                    .startAfter('Eletrônicos')
                    .get()
                    
categories.then(snapshot => {
  let total = 0
  snapshot.forEach(doc => {
    if (total < pageSize) {
      console.log('ID: ' + doc.id, ' => ', doc.data().category);
    } 
    total++
  })
  if (total > pageSize) {
    console.log('has next page.');
  } else {
    console.log('doesnt have next page.');
  }
})