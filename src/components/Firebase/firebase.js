import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import firebase from 'firebase';


// Uncomment and add in your own firebase setup

// const config = {
//     apiKey: "",
//     authDomain: "",
//     databaseURL: "",
//     projectId: "",
//     storageBucket: "",
//     messagingSenderId: "",
//     appId: "",
//     measurementId: ""
//   };

  class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
      this.db = app.database();
      this.st = app.storage();
    }

    // Auth API 
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

     // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
  this.auth.onAuthStateChanged(authUser => {
    if (authUser) {
      this.user(authUser.uid)
        .once('value')
        .then(snapshot => {
          const dbUser = snapshot.val();

          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = {};
          }

          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            ...dbUser,
          };

          next(authUser);
        });
    } else {
      fallback();
    }
  });
// Chatroom API

// clearChat = () => 
// {
//   var ref = this.db.ref().child('chatrooms').child('global');
//   console.log("hello button");
//   ref.update({

//   });
// }
// *** User API ***

user = uid => this.db.ref(`users/${uid}`);
userImage = uid => this.db.ref(`users/images/${uid}`);
users = () => this.db.ref('users');

// ** Storage API **
storageImage = uid => this.st.ref(`users/${uid}/images`)
  }
  export default Firebase;