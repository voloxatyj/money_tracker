import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  STOP_LOADING_UI,
} from "../types";
import axios from 'axios'
import { getData } from './dataActions'

export const loginUser = (userData, history) => dispatch => {
	dispatch({ type: LOADING_UI })
	axios.post('/login', userData)
		.then(res => {
			setAuthorizationHeader(res.data)
			dispatch(getUser())
			dispatch(getData())
			dispatch({ type: CLEAR_ERRORS })
			history.push('/')
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			})
		})
}

export const getUser = () => dispatch => {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('DBAuthToken') || undefined
	dispatch({ type: LOADING_UI })
		axios.get('/user')
			.then(res => {
				dispatch({
          payload: res.data,
          type: SET_AUTHENTICATED,
        });
			})
			.catch(err => console.log(err))
}

export const signUpUser = (userData, history) => dispatch => {
	dispatch({ type: LOADING_UI })
	axios.post('/signup', userData)
		.then(res => {
			setAuthorizationHeader(res.data)
			dispatch(getUser())
			dispatch(getData())
			dispatch({ type: "CLEAR_ERRORS" })
		})
		.then(() => history.push('/'))
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			})
		})
}

export const setAuthorizationHeader = ({ token }) => {
	const DBAuthToken = `Bearer ${token}`
	localStorage.setItem('DBAuthToken', DBAuthToken)
	axios.defaults.headers.common['Authorization'] = DBAuthToken
}

export const logOutUser = () => dispatch => {
	localStorage.removeItem('DBAuthToken')
	delete axios.defaults.headers.common['Authorization']
	dispatch({ type: SET_UNAUTHENTICATED })
	dispatch({ type: STOP_LOADING_UI });
}

export const uploadImage = formData => dispatch => {
	axios.post('/user/uploadImage', formData)
		.then(() => dispatch(getUser()))
		.catch(err => console.log(err))
}