const functions = require('firebase-functions');

var admin = require("firebase-admin");

var serviceAccount = require('./screammo-148ea-b2d72f9fa2cc.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://screammo-148ea.firebaseio.com"
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Backend!");
});

exports.getScreams=functions.https.onRequest((req,res)=>{
    admin.firestore().collection('screams').get()
        .then(data=>{
            let screams=[];
            data.forEach(doc=>{
                screams.push(doc.data());
            })
            return res.json(screams);
        })
        .catch(err=>{
            console.log(err);
        })
});

exports.createScream=functions.https.onRequest((req,res)=>{
    const newScream={
        body:req.body.body,
        userHandle:req.body.userHandle,
        createdAt:admin.firestore.Timestamp.fromDate(new Date())
    };

    admin.firestore()
        .collection('screams')
        .add(newScream)
        .then(doc =>{
            res.json({message:`document ${doc.id} created successfully!`})
        })
        .catch(err=>{
            res.status(500).json({error:'something went wrong'})
            console.error(err);
        })
});