var admin = require("firebase-admin");
var serviceAccount = require('../screammo-148ea-b2d72f9fa2cc.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://screammo-148ea.firebaseio.com"
});


const db = admin.firestore();

module.exports={admin,db};