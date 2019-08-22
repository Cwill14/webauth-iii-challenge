import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../axiosAuth';
import User from './User';

const Users = props => {

    const [users, setUsers] = useState([]);
    const [loggedIn, setLoggedIn] = useState('')

    useEffect(() => {
        axiosWithAuth()
            .get('http://localhost:8000/users')
                .then(res => {
                    console.log(res.data);
                    setLoggedIn(res.data.loggedInUser);
                    console.log("loggedIn then: ", loggedIn)                    
                    setUsers(res.data.filtered);
                })
                .catch(err => {
                    console.log(err)
                })
    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        props.history.push('/');
    }

    console.log("loggedIn: ", loggedIn)

    return (
        <div>
            <button onClick={logout}>logout</button>
                { users.length
                    ? 
                    (   
                        <h3>{loggedIn}</h3>,
                        // users.map(user => <p>{user.username}</p>)
                        users.map(user => {
                            return <User key={user.id} user={user} />
                        })
                    )
                    : <h2>loading...</h2>
                }

        </div>
    )
}

export default Users;