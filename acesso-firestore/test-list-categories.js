const admin = require('firebase-admin');

const serviceAccount = require('./firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const categories = db.collection('categories').get()
categories.then(snapshot => {
    // console.log(snapshot.empty);
    snapshot.forEach(doc => {
        // console.log('ID: ' + doc.id, doc.data());
        db.collection('products')
            .doc(doc.id)
            .collection('images')
            .get()
            .then(imgSnapshot => {
                console.log(imgSnapshot);
                imgSnapshot.forEach(img => {
                    console.log('img id ==> ', img.id,' => ', img.data());
                })
            })
    })
})