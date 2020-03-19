const functions = require('firebase-functions');
var admin = require("firebase-admin");
const app = require('express')();
const { firebaseConfig } = require('./config');


var serviceAccount = require('./screammo-148ea-b2d72f9fa2cc.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://screammo-148ea.firebaseio.com"
});

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();


exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Backend!");
});





app.get('/screams', (req, res) => {
    db.collection('screams').orderBy('createdAt', 'desc').get()
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

    db
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

const isEmail=(email)=>{
   const regEx=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if(email.match(regEx)) return true;
   else return false;
}

const isEmpty=(string)=>{
    if(string.trim()==='') return true;
    else return false;
}

//Signup route
app.post('/signup', ((req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    //Validation

    let errors={}; 

    if(isEmpty(newUser.email)){
        errors.email='Email must not be empty';
    }else if(!isEmail(newUser.email)){
        errors.email="Must be a valid email address";
    }

    if(isEmpty(newUser.password)) errors.password="Must not empty"
    if(newUser.password!==newUser.confirmPassword) errors.confirmPassword='Passwords must match';
    if(isEmpty(newUser.handle)) errors.handle="Must not be empty";
    
    if(Object.keys(errors).length>0){
        return res.status(400).json(errors);
    }

    //End of Validation

    let token,userId; 
    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ handle: 'this handle is already taken' })
            } else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        }).then(data => {
            userId=data.user.uid;
            return data.user.getIdToken();
        })
        .then(idtoken => {
            token=idtoken;
            const userCredentials={
                handle:newUser.handle,
                email:newUser.email,
                createdAt:new Date().toISOString(),
                userId
            };
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        }).then(()=>{
            return res.status(201).json({token});
        })
        .catch(err => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                return res.status(400).json({ email: 'Email already in use' });
            } else {
                return res.status(500).json({ error: err.code });
            }

        })


}))

exports.api = functions.https.onRequest(app);