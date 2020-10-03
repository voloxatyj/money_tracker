import React from 'react'
import Home from './components/Home'
import { Navbar } from './components/Navbar'
import { AuthForm } from './components/AuthForm'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Card } from './components/layouts/Card'
import Table from './components/table/Table'
import './App.css'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
/* REDUX */
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logOutUser, getUserData } from './redux/actions/userActions'

axios.defaults.baseURL = "https://us-central1-make-and-save-c1e7a.cloudfunctions.net/api"
// axios.defaults.baseURL = "http://localhost:5000/make-and-save-c1e7a/us-central1/api"

const token = localStorage.DBAuthToken || undefined
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOutUser())
    window.location.href = '/login'
  }
  store.dispatch({ type: SET_AUTHENTICATED })
  axios.defaults.headers.common['Authorization'] = token
  store.dispatch(getUserData())
} 

export const App = () => {
   return (
     <Provider store={store}>
      <Router>
        <Switch>
          <div className="container-fluid">
            <Navbar />
            <Card />
            <Route exact path='/' component={Home} />
            <Route path='/table' component={Table} />
            <Route path='/authform' component={AuthForm} />
          </div>
        </Switch>
      </Router>
     </Provider>
  )
}