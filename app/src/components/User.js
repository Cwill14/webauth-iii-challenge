import React from 'react';

const User = props => {

    return (
        <div className="user">
            <p>{`ID: ${props.user.id}`}</p>
            <h3>{`Username: ${props.user.username}`}</h3>
            {/* <span>Username: </span><h4>{props.user.username}</h4> */}
            <p>{`Department: ${props.user.department}`}</p>
        </div>
    )
}
export default User;