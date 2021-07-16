import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
import './App.css'
import axios from './apis/axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const isAuth = async () => {
    const token = localStorage.token
    if(token) {
      try {
        const response = await axios.get('/auth/is-verify', {
          headers: {
            token: token
          }
        })
  
        setIsAuthenticated(response.data)
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  useEffect(() => {
    isAuth()
  }, [])

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />} />
            <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />} />
            <Route exact path="/register" render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
            <Route exact path="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  )
}

export default App
