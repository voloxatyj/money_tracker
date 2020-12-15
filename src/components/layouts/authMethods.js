import firebase from 'firebase'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import store from '../../redux/store'
import { getUser, setAuthorizationHeader } from '../../redux/actions/userActions'
import { getData } from '../../redux/actions/dataActions'

firebase.initializeApp({
	apiKey: "AIzaSyD5adg6COdhMVMHu3mUUq8zhhUYe3eHG2w",
	authDomain: "make-and-save-c1e7a.firebaseapp.com"
})

export const Auth = (serviceAuth, history) => {
	const service = {
		facebook: new firebase.auth.FacebookAuthProvider(),
		google: new firebase.auth.GoogleAuthProvider(),
		twitter: new firebase.auth.TwitterAuthProvider(),
		github: new firebase.auth.GithubAuthProvider()
	}
	const provider = service[serviceAuth];
	firebase.auth().signInWithPopup(provider)
	.then((result) => {
			const IdToken = firebase.auth().currentUser.getIdToken(true)
			IdToken
				.then(res=>{
					const DBAuthToken = `Bearer ${res}`
        	localStorage.setItem('DBAuthToken', DBAuthToken)
					axios.defaults.headers.common['Authorization'] = DBAuthToken
				})
				.then(()=>{
					store.dispatch(getUser())
					store.dispatch(getData())
				})
				.then(()=>{
					history.push('/')
				})
				.catch(error => console.log(error.message))
		})
		.catch(error => console.log(error.message))}
