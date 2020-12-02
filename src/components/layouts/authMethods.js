import firebase from 'firebase'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { secretKey } from '../../utils/config'
import store from '../../redux/store'
import { getUser,setAuthorizationHeader } from '../../redux/actions/userActions'
import { getData } from '../../redux/actions/dataActions'
import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  STOP_LOADING_UI,
} from "../../redux/types";

firebase.initializeApp({
	apiKey: "AIzaSyD5adg6COdhMVMHu3mUUq8zhhUYe3eHG2w",
	authDomain: "make-and-save-c1e7a.firebaseapp.com"
})

export const facebookAuth = () => {
	const provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider)
	.then((result) => {
			const IdToken = firebase.auth().currentUser.getIdToken(true)
			IdToken
				.then(res=>{
					axios.defaults.headers.common['Authorization'] = `Bearer ${res}`
				})
				.then(()=>{
					store.dispatch(getUser())
					store.dispatch(getData())
				})
				.catch(error => console.log(error.message))
				const token = jwt.sign({
					exp: Math.floor(Date.now() / 1000) + (60 * 60),
					data: result.user
				}, secretKey); 
				const DBAuthToken = `Bearer ${token}`
				localStorage.setItem('DBAuthToken', DBAuthToken)
		})
		.catch(error => console.log(error.message))}
