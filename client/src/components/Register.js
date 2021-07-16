import React, { Fragment, useState } from 'react'
import axios from '../apis/axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = ({ setAuth }) => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitForm = async (e) => {
        e.preventDefault();
        
        try {
            
            const response = await axios.post('/auth/register', {
                name,
                email,
                password
            }).catch(error => {
                toast.error(error.response.data, {
                    position: 'top-center'
                })
            })

            if(response !== undefined) {
                localStorage.setItem('token', response.data.token)
                setAuth(true)
                toast.success('User created!', {
                    position: 'top-center'
                })
            }
            

        } catch (err) {
            console.log(err.message)
        }
    }

    return(
        <Fragment>
            <h1 className="text-center my-5">Registration</h1>
            <form>
                <div className="form-group">
                    <h4><label htmlFor="name">Full Name:</label></h4>
                    <input 
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="form-control my-3"
                    />
                </div>
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
                        autoComplete="off"
                        name="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="form-control my-3"
                    />
                </div>
                <button onClick={onSubmitForm} className="btn btn-success btn-block">Register</button>
            </form>
            <span>Already have an account? </span><Link to='/login'>Login here!</Link>
        </Fragment>
    )
}

export default Register