import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import {NavLink, useHistory} from 'react-router-dom'
import {getAllGroups} from "./Function";

const Profile = ({setGroups}) => {
    const history = useHistory();
    const [values, setValues] = useState({
        first_name: '',
        lastName: '',
        email: ''
    })

    useEffect(async () => {
        let gs = await getAllGroups();
        setGroups(gs)
    }, [])

    useEffect(() => {
        if (localStorage.jwt_token) {
            const token = localStorage.jwt_token;
            const decode = jwt_decode(token);

            setValues({
                first_name: decode.firstName,
                last_name: decode.lastName,
                email: decode.email
            })
        } else {
            history.push('/')
        }
    }, [])

    return (
        <>
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                        <tr>
                            <td>Fist Name</td>
                            <td>{values.first_name}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{values.last_name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{values.email}</td>
                        </tr>
                        </tbody>
                    </table>
                    {localStorage.getItem('access_token') &&
                    <div className='col-lg-6 mx-auto mt-4'>
                        <NavLink className='btn btn-primary' to='/create-post'>Create Post</NavLink>
                    </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Profile;