import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../axiosAuth';

const Users = props => {

    const [users, setUsers] = useState([]);
    const [loggedIn, setLoggedIn] = useState('')

    useEffect(() => {
        axiosWithAuth()
            .get('http://localhost:8000/users')
                .then(res => {
                    console.log("res: ", res);
                    console.log("res.data.filtered: ", res.data.filtered)
                    setUsers(res.data.filtered);
                    setLoggedIn(res.data.loggedInUser)
                    console.log("loggedIn: ", loggedIn)
                    console.log("users: ", users)

                })
                .catch(err => console.log(err))
    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        props.history.push('/');
    }


    return (
        <div>
            
            <button onClick={logout}>logout</button>
            {/* <h4>{users.loggedInUser}</h4>
            {users.filtered.map(user => {
                return <p>{user}</p>
            })} */}
        </div>
    )
}

export default Users;