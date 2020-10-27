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
import jwtDecode from 'jwt-decode'
/* REDUX */
import { Provider } from 'react-redux'
import store from './redux/store'
import { logOutUser, getUser } from './redux/actions/userActions'
import { getData } from './redux/actions/dataActions'
import InformCard from './components/InformCard'

// axios.defaults.baseURL = "https://us-central1-make-and-save-c1e7a.cloudfunctions.net/api"
axios.defaults.baseURL = "http://localhost:5000/make-and-save-c1e7a/us-central1/api"

const token = localStorage.getItem('DBAuthToken') || undefined
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOutUser())
    window.location.href = '/'
  }
  axios.defaults.headers.common['Authorization'] = token
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