var admin = require("firebase-admin");
var serviceAccount = require("../screammo-148ea-b2d72f9fa2cc.json");
const { firebaseConfig } = require("../util/config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://screammo-148ea.firebaseio.com",
  storageBucket: `${firebaseConfig.storageBucket}`,
});

const db = admin.firestore();

module.exports = { admin, db };
