const admin = require('firebase-admin')

admin.initializeApp()

const config = {
	apiKey: "AIzaSyD5adg6COdhMVMHu3mUUq8zhhUYe3eHG2w",
	authDomain: "make-and-save-c1e7a.firebaseapp.com",
	databaseURL: "https://make-and-save-c1e7a.firebaseio.com",
	projectId: "make-and-save-c1e7a",
	storageBucket: "make-and-save-c1e7a.appspot.com",
	messagingSenderId: "816745144122",
	appId: "1:816745144122:web:aa5b8680726e6b3550ba03",
	measurementId: "G-RJWC6KGPZC"
}

const db = admin.firestore()

module.exports = { admin, db, config }