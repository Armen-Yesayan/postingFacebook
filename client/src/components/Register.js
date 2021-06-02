import React, {useState} from 'react';
import {register} from "./Function";
import {useHistory} from 'react-router-dom'

const Register = () => {
    const history = useHistory();

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })

    const onSubmit = (e) => {
        e.preventDefault()

        const user = {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            password: form.password
        }

        register(user).then(res => {
            history.push(`/login`)
        })
    }

    const onChange = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                        <div className="form-group">
                            <label htmlFor="name">First name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                placeholder="Enter your first name"
                                value={form.first_name}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Last name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                placeholder="Enter your lastname name"
                                value={form.last_name}
                                onChange={onChange}
                            />
                        </div>
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
                            className="btn btn-lg btn-primary btn-block"
                        >
                            Register!
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;