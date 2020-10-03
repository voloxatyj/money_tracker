import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types'

const initialState = {
	info: {},
	authenticated: false
}

export default function(state=initialState, action) {
	switch (action.type) {
		case SET_AUTHENTICATED:
				return {
					...state,
					authenticated: true
				}
		case SET_UNAUTHENTICATED:
				return initialState
		case SET_USER:
			if (Object.keys(action.payload)[0] === "userCredentials") {
				return {
					authenticated: true,
					info: action.payload.userCredentials
				}
			} else {
				return {
					authenticated: true,
					info: action.payload[action.payload.length - 1]
				}
			}
		default:
			return state
	}
}