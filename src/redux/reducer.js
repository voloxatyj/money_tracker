export const state = {
	user:  {
		info: {},
		authenticated: false
	},
	data: [],
	ui: {
		loading: false,
		error: null,
	}
}

const reducer = (state, action) => {
	switch(action.type) {
		/* UI PART */
		case "LOADING_UI":
			return {
				...state,
				ui: {
					loading: true
				}
			}
		case "STOP_LOADING_UI":
			return {
				...state,
				ui: {
					login: true,
					loading: false,
					error: null
				}
			}
		case "SET_ERRORS":
			return {
				...state,
				ui: {
					loading: false,
					error: action.payload,
					login: false
				}
			}
		case "CLEAR_ERRORS":
			return {
				...state,
				ui: {
					loading: false,
					error: null,
					login: false
				}
			}
		/* USER PART */
		case "SET_AUTHENTICATED":
			return {
				...state,
				user: {
					info: action.payload[action.payload.length-1],
					authenticated: true
				},
				items: action.payload.pop()
			}
		case "SET_UNAUTHENTICATED":
			return state
		default:
			return state;
	}
}

export default reducer