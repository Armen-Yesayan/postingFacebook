import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import {useHistory} from 'react-router-dom'

const Profile = () => {
    const history = useHistory();
    const [values, setValues] = useState({
        first_name: '',
        lastName: '',
        email: ''
    })

    useEffect(() => {
        if(localStorage.jwt_token) {
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
            </div>
        </div>
    );
};

export default Profile;