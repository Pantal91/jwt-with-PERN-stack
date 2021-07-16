import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from '../apis/axios'

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState('')

    const logout = () => {
        setAuth(false)
        localStorage.removeItem('token')
        toast.success('You have successfully logged out!', {
            position: 'top-center'
        })
    }

    useEffect(() => {
        const headers = {
            'token': localStorage.token
        }

        const fetchData = async () => {
        try {
            const response = await axios.get('/dashboard', {
                headers: headers
            })

            setName(response.data)
        } catch (err) {
            console.log(err.message)
        }
        }

        fetchData()
    }, [])

    return(
        <Fragment>
            <h1>Dashboard</h1>
            <h2>Name: {name}</h2>
            <button className="btn btn-primary" onClick={() => logout()}>Logout</button>
        </Fragment>
    )
}

export default Dashboard