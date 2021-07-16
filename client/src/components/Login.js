import React, { Fragment, useState } from 'react'
import axios from '../apis/axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = ({setAuth}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/auth/login', {
                email,
                password
            }).catch(error => {
                toast.error(error.response.data, {
                    position: 'top-center'
                })
            })

            if(response.data.token !== undefined) {
                localStorage.setItem('token', response.data.token)
                setAuth(true)
                toast.success('Login success!', {
                    position: 'top-center'
                })
            } else {
                setAuth(false)
            }
        } catch (err) {}
    }

    return(
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form>
                <div className="form-group">
                    <h4><label htmlFor="email">Email address:</label></h4>
                    <input 
                        type="text"
                        placeholder="Email address"
                        name="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="form-control my-3"
                    />
                </div>
                <div className="form-group">
                    <h4><label htmlFor="password">Password:</label></h4>
                    <input 
                        type="password"
                        placeholder="Password"
                        autoComplete="on"
                        name="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="form-control my-3"
                    />
                </div>
                <button onClick={onSubmitLogin} className="btn btn-success btn-block">Login</button>
            </form>
            <span>Don't have account? </span><Link to='/register'>Register!</Link>
        </Fragment>
    )
}

export default Login