const functions = require('firebase-functions');
var admin = require("firebase-admin");
const app = require('express')();
const {firebaseConfig}=require('./config');


var serviceAccount = require('./screammo-148ea-b2d72f9fa2cc.json');
//screammo-148ea-e372653e9615
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://screammo-148ea.firebaseio.com"
});

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);


exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send(firebaseConfig);
    
    response.send("Hello from Backend!");
});





app.get('/screams', (req, res) => {
    admin.firestore().collection('screams').orderBy('createdAt', 'desc').get()
        .then(data => {
            let screams = [];
            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                });
            })
            return res.json(screams);
        })
        .catch(err => {
            console.log(err);
        })
})


app.post('/scream', ((req, res) => {

    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString
    };

    admin.firestore()
        .collection('screams')
        .add(newScream)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully!` })
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' })
            console.error(err);
        })
}));

//Signup route
app.post('/signup', ((req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    }

    firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
        .then(data=>{
            return res.status(201).json({message:`user ${data.user.email} signed up successfully`});
        })
        .catch(err=>{
            console.error(err);
            return res.status(500).json({error:err.code});
        })

   
}))

exports.api = functions.https.onRequest(app);