import React, {createContext, useContext, useReducer} from 'react'

export const DataContext = createContext();

export const DataProvider = ({ reducer, state, children }) => (
	<DataContext.Provider value={useReducer(reducer,state)}>
		{children}
	</DataContext.Provider>
)

export const useUserData = () => useContext(DataContext)