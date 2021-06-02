import axios from "axios";

export const login = (user) => {
    return axios.post('http://localhost:5000/users/login', {
        email: user.email,
        password: user.password
    }).then(response => {
        console.log(response.data)
        localStorage.setItem('jwt_token', response.data.token)
        return response.data
    }).catch(err => {
        console.log(err)
    })
}

export const LoginGoogle = (tokenId) => {
    return axios.post('http://localhost:5000/users/google-login', {
        tokenId
    }).then(response => {
        localStorage.setItem('jwt_token', response.data.token)
        return response.data
    }).catch(err => {
        console.log(err)
    })
}

export const LoginFacebook = (user) => {
    return axios.post('http://localhost:5000/users/facebook-login', {
        user
    }).then(response => {
        localStorage.setItem('jwt_token', response.data.token)
        return response.data
    }).catch(err => {
        console.log(err)
    })
}

export const register = (user) => {
    return axios.post('http://localhost:5000/users/register', {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        password: user.password
    }).then(response => {
        console.log("Registered")
    })
}