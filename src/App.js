import React from 'react'
import Home from './pages/Home'
import { Navbar } from './components/Navbar'
import { AuthForm } from './pages/AuthForm'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Card } from './components/layouts/Card'
import { StickyHeadTable } from "./pages/Table";
import { Diagrams } from './pages/Diagrams'
import './App.css'
import axios from 'axios'
import jwt from 'jsonwebtoken'
/* REDUX */
import { Provider } from 'react-redux'
import store from './redux/store'
import { logOutUser, getUser } from './redux/actions/userActions'
import { getData } from './redux/actions/dataActions'
import InformCard from './components/InformCard'
import { secretKey } from './utils/config'

// axios.defaults.baseURL = "https://us-central1-make-and-save-c1e7a.cloudfunctions.net/api"
axios.defaults.baseURL = "http://localhost:5000/make-and-save-c1e7a/us-central1/api"

if (localStorage.getItem('DBAuthToken')) {
  const token = localStorage.getItem('DBAuthToken').split(' ')[1] || undefined
  const decodedToken = jwt.verify(token, secretKey)
  if(decodedToken.exp * 1000 < Date.now()){
    localStorage.removeItem('DBAuthToken')
    window.location.href='/'
    store.dispatch(logOutUser())
  }
  // axios.defaults.headers.common['Authorization'] = token
  store.dispatch(getUser())
  store.dispatch(getData())
}

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <>
            <Navbar />
            <Card />
            <Route exact path="/" component={Home} />
            <Route exact path="/table" component={StickyHeadTable} />
            <Route exact path="/table/:item" component={InformCard} />
            <Route exact path="/authform" component={AuthForm} />
            <Route exact path="/diagrams" component={Diagrams} />
          </>
        </Switch>
      </Router>
    </Provider>
  );
}