const functions = require('firebase-functions');
const app = require('express')();
const { firebaseConfig } = require('./config');
const FBAuth = require('./util/FBAuth')

const { getAllScreams, postOneScream } = require('./handlers/screams')
const { signup, login, uploadImage } = require('./handlers/users');

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Backend!");
});

//Scream routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream);

// isers routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)

exports.api = functions.https.onRequest(app);