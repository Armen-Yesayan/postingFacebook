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
        console.log(response)
        localStorage.setItem('jwt_token', response.data.token.token)
        localStorage.setItem('access_token', response.data.access_token)
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

export const createPost = async (value) => {
    const token = await axios.get(`https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=540039300497467&client_secret=6090c3f5d60d13242c5fb3159fd6732f&fb_exchange_token=${localStorage.getItem('access_token')}`);

    if (token) {
        const t = await axios.get(`https://graph.facebook.com/108841611413884/accounts?access_token=${token.data.access_token}`);

        if(t) {
            const result = await axios.post(`https://graph.facebook.com/106406601662237/feed`, {
                message: value,
                access_token: t.data.data[0].access_token
            })

            if(result.data.id) {
                return 'Created successfully!'
            }
        }
    }
}