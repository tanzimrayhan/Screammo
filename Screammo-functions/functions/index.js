const functions = require("firebase-functions");
const app = require("express")();
const { firebaseConfig } = require("./config");
const FBAuth = require("./util/FBAuth");

const {
  getAllScreams,
  postOneScream,
  getScream,
} = require("./handlers/screams");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handlers/users");

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Backend!");
});

//Scream routes
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postOneScream);
app.get("/scream/:screamId", getScream);
//TODO delete scream
//TODO like a scream
//TODO unlike a scream
//TODO comment a  scream

// Users routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
