const functions = require('firebase-functions');
const app = require('express')();
const { firebaseConfig } = require('./config');

const {getAllScreams}= require ('./handlers/screams')
const {signup, login}=require('./handlers/users');

var serviceAccount = require('./screammo-148ea-b2d72f9fa2cc.json');



const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);



exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Backend!");
});




//Scream routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth,postOneScream);

// isers routes
app.post('/signup', signup)
app.post('/login', login )



const FBAuth = (req, res, next) => {

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];

    } else {
        console.error('No Token Found');
        return res.status(403).json({ error: 'Unauthorized' });
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            console.log(decodedToken);
            return db.collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then(data => {
            req.user.handle = data.docs[0].data().handle;
            return next();
        })
        .catch(err => {
            console.error("Error while verifying token", err);
            return res.status(403).json(err);
        })
}




const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
}

const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
}


exports.api = functions.https.onRequest(app);