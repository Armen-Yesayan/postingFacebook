import React, {useState} from 'react';
import {login, LoginFacebook, LoginGoogle} from "./Function";
import {useHistory} from 'react-router-dom';
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login'


const Login = ({setToken}) => {
    const history = useHistory();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const onSubmit = (e) => {
        e.preventDefault()

        const user = {
            email: form.email,
            password: form.password
        }

        login(user).then(res => {
            if (res) {
                setToken(true)
                history.push(`/profile`)
            }
        })
    }

    const onChange = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const responseSuccessGoogle = (response) => {
        LoginGoogle(response.tokenId).then(res => {
            if (res) {
                setToken(true)
                history.push(`/profile`)
            }
        });
    }

    const responseErrorGoogle = (response) => {
        console.log(response)
    }
    const responseFacebook = (response) => {
        console.log(response)
        LoginFacebook(response).then(res => {
            if (res) {
                setToken(true)
                history.push(`/profile`)
            }
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter email"
                                value={form.email}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={onChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block mb-4"
                        >
                            Sign in
                        </button>
                        <GoogleLogin
                            clientId="240943418839-e5s9s72bb0cdr490nods5ld4euc73skk.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <button className='d-flex w-100 justify-content-center'
                                        onClick={renderProps.onClick}
                                        style={{
                                            background: 'white',
                                            color: 'rgba(0, 0, 0, 0.54)',
                                            boxShadow: 'rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px',
                                            borderRadius: '2px',
                                            border: '1px solid #ccc'
                                        }}
                                >
                                    <div style={{
                                        marginRight: '10px',
                                        background: 'rgb(255, 255, 255)',
                                        padding: '10px',
                                        borderRadius: '2px'
                                    }}>
                                        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                                            <g fill="#000">
                                                <path
                                                    d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                                                    fill="#EA4335"/>
                                                <path
                                                    d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                                                    fill="#4285F4"/>
                                                <path
                                                    d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                                                    fill="#FBBC05"/>
                                                <path
                                                    d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                                                    fill="#34A853"/>
                                                <path fill="none" d="M0 0h18v18H0z"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <span style={{
                                        padding: '10px 10px 10px 0px',
                                        fontWeight: '500'
                                    }}>Login with Google</span>
                                </button>
                            )
                            }
                        />

                        <div className='mt-4'>
                            <FacebookLogin
                                appId="540039300497467"
                                autoLoad={true}
                                fields="first_name,last_name,email,picture"
                                callback={responseFacebook}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;