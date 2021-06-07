import axios from "axios";

export const login = (user) => {
    return axios.post('http://localhost:5000/users/login', {
        email: user.email,
        password: user.password
    }).then(response => {
        localStorage.setItem('jwt_token', response.data.token)
        localStorage.setItem('refresh_token', response.data.refresh_token)
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
        localStorage.setItem('jwt_token', response.data.token.token)
        localStorage.setItem('refresh_token', response.data.token.refresh_token)
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

export const createPost = async (value, img) => {
    const token = await axios.get(`https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=540039300497467&client_secret=6090c3f5d60d13242c5fb3159fd6732f&fb_exchange_token=${localStorage.getItem('access_token')}`);

    if (token) {
        const t = await axios.get(`https://graph.facebook.com/${localStorage.getItem('user_id')}/accounts?access_token=${token.data.access_token}`);

        if(t) {
            let result;
            if(img) {
                let fd = new FormData();
                fd.append('message', value);
                fd.append('access_token', t.data.data[0].access_token);
                fd.append('picture', img);
                result = await axios.post(`https://graph.facebook.com/106406601662237/photos`, fd)
            } else {
                result = await axios.post(`https://graph.facebook.com/106406601662237/feed`, {
                    message: value,
                    access_token: t.data.data[0].access_token
                })
            }

            if(result.data.id) {
                return 'Created successfully!'
            }
        }
    }
}

export const getAllGroups = async () => {
    const id = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');

    const groups = await axios.get(`https://graph.facebook.com/${id}/groups?access_token=${token}`);

    if (groups.status === 200) {
        return groups.data.data;
    }
}

export const createGroupPost = async (id, message, img) => {
    const token = localStorage.getItem('access_token');
    let fd = new FormData();
    fd.append('access_token', token);
    fd.append('message', message);
    let res;

    if(img) {
        fd.append('picture', img);
        res = await axios.post(`https://graph.facebook.com/${id}/photos`, fd);
    } else {
        res = await axios.post(`https://graph.facebook.com/${id}/feed`, fd);
    }
    if(res.data.id) {
        return 'Created successfully!'
    }
}

export const RefreshToken = () => {
    const token = localStorage.getItem('refresh_token');

    return axios.post('http://localhost:5000/users/refresh-token', {
        refreshToken: token
    }).then(response => {
        localStorage.setItem('jwt_token', response.data.token)
        localStorage.setItem('refresh_token', response.data.refresh_token)
        return response.data
    }).catch(err => {
        console.log(err)
    })
}