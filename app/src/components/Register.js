import React, { useState } from 'react';
import { axiosWithAuth } from '../axiosAuth';
import { Link } from 'react-router-dom';

const Register = props => {

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

    const register = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('http://localhost:8000/auth/register', values)
            .then(res => {
                console.log(res)
                props.history.push('/');
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
            <h1>Register</h1>
            <form onSubmit={register}>
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
            <Link to="/">Login</Link>
        </div>
    )
}

export default Register;