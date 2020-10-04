import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import uiReducer from './reducers/uiReducer'
import dataReducer from './reducers/dataReducer'

// const initialState = {}

// const middleware = [thunk] || [window.thunk.default]

// const reducers = combineReducers({
// 	user: userReducer,
// 	data: dataReducer,
// 	ui: uiReducer
// })

// const store = createStore(
// 	reducers,
// 	initialState,
// 	compose(
// 		applyMiddleware(...middleware),
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// 	)
// )

// export default store

const reducers = combineReducers({
	data: userReducer,
	ui: uiReducer
})

const middleware = [
	applyMiddleware(...[thunk] || [window.thunk.default]),
	...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
]

const store = createStore(
	reducers,
	initialState,
	compose(...middleware)
)

export default store