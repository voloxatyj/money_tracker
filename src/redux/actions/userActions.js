import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => dispatch => {
	dispatch({ type: LOADING_UI })
	axios.post('/login', userData)
	.then(res => {
		setAuthorizationHeader(res.data)
		dispatch(getUserData('login'));
		dispatch({ type: CLEAR_ERRORS })
		history.push('/table')
	})
	.catch(err => {
		dispatch({
			type: SET_ERRORS,
			payload: err.response.data
		})
	}
	)
}

export const getUserData = type => dispatch => {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('DBAuthToken') || undefined
	dispatch({ type: LOADING_UI })
	type === 'login' ?
		axios.get('/items')
			.then(res => {
				dispatch({
					type: SET_USER,
					payload: res.data
				})
			})
			.catch(err => console.log(err))
		: axios.get('/user')
			.then(res => {
				dispatch({
					type: SET_USER,
					payload: res.data
				})
			})
			.catch(err => console.log(err))
}

export const signUpUser = (userData, history) => dispatch => {
	dispatch({ type: LOADING_UI })
	axios.post('/signup', userData)
		.then(res => {
			setAuthorizationHeader(res.data)
			dispatch(getUserData())
			dispatch({ type: "CLEAR_ERRORS" })
		})
		.then(() => history.push('/table'))
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			})
		}
		)
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
}