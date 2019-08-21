import React, { useState } from 'react';
import { axiosWithAuth } from '../axiosAuth';
import { Link } from 'react-router-dom';

const Login = props => {
    
    const [values, setValues] = useState({
        username: '',
        password: '',
        department: ''
    })
    const handleChanges = e => {
        e.preventDefault();
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const login = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('http://localhost:8000/auth/login', values)
            .then(res => {
                console.log(res)
                localStorage.setItem("token", res.data.token);
                props.history.push('/users');
            })
            .catch(err => {
                console.log(err)
            })
        setValues({
            username: '',
            password: '',
            department: ''
        })

    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <input
                    type="username"
                    placeholder="username"
                    name="username"
                    value={values.username}
                    onChange={handleChanges}
                    autoComplete="off"
                    autoCapitalize="off"
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={values.password}
                    onChange={handleChanges}
                    autoComplete="off"
                    autoCapitalize="off"
                    required
                />
                <input 
                    placeholder="department"
                    name="department"
                    value={values.department}
                    onChange={handleChanges}
                    autoComplete="off"
                    autoCapitalize="off"
                    required
                />
                <button>Submit</button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login;