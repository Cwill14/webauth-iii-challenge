import React, { useState } from 'react';
import { axiosWithAuth } from '../axiosAuth';
import { Link } from 'react-router-dom';

const Login = props => {
    
    const [values, setValues] = useState({
        username: '',
        password: '',
        department: ''
    })

    // const [welcome, setWelcome] = useState('');
    // const [displayWelcome, setDisplayWelcome] = useState(false);

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
                // setDisplayWelcome(true)
                // setWelcome(res.data.message);
                // setTimeout( () => setDisplayWelcome(false), 1500)
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
            <form onSubmit={login} className="login">
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
            <Link to="/register" className="registerLink">Register</Link>
            {/* { displayWelcome && <h3>{welcome}</h3>} */}
            {/* { welcome && <h3>{welcome}</h3>} */}
            {/* <h3>{welcome}</h3> */}
        </div>
    )
}

export default Login;