import React, {useEffect, useState} from 'react';
import {Link, withRouter, useHistory} from 'react-router-dom'
import LoginRegLink from "./navbar/loginRegLink";
import UserLink from "./navbar/userLink";

const Navbar = ({token, setToken}) => {
    const history = useHistory();

    const logOut = (e) => {
        setToken(false)
        e.preventDefault();
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        history.push('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                </ul>

                {!token ? <LoginRegLink/> : <UserLink logout={logOut}/>
                }
            </div>
        </nav>
    );
};

export default Navbar;