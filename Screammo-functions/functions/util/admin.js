var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://screammo-148ea.firebaseio.com"
});


const db = admin.firestore();

module.exports={admin,db};