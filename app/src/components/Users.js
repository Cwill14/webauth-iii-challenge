import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../axiosAuth';

const Users = props => {

    const [users, setUsers] = useState([]);
    const [loggedIn, setLoggedIn] = useState('')

    // let users = [];
    // let loggedIn = '';
    let loaded = false;

    useEffect(() => {
        axiosWithAuth()
            .get('http://localhost:8000/users')
                .then(res => {
                    console.log("res.data: ", res.data);
                    // console.log("res.data.loggedInUser: ", res.data.loggedInUser);
                    // console.log("res.data.data.filtered: ", res.data.filtered)
                    setLoggedIn(res.data.loggedInUser);
                    // setLoggedIn('clark');
                    // console.log('loading inside: ', loaded)
                    // users = res.data.data.filtered;
                    // loggedIn = res.data.data.loggedInUser;
                    loaded = true;
                    setUsers(res.data.filtered);
                    // setUsers([1, 2, 4]);
                    // console.log("loggedIn: ", loggedIn)
                    // console.log("users: ", users)

                })
                .catch(err => {
                    loaded = false 
                    console.log(err)
                })
    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        props.history.push('/');
    }

    // if(!loaded) {
    //     return (
    //         <h3>loading..</h3>
    //     )
    // } else {

    return (
        <div>
            
            <button onClick={logout}>logout</button>
                { users.length
                    ? (<h4>{loggedIn}</h4>,
                    users.map(user => <p>{user.username}</p>))
                    : <h2>loading...</h2>
                }

        </div>
    )
    // }

}

export default Users;