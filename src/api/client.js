import axios from 'axios';

const { REACT_APP_API_URL: baseURL } = process.env;

const client = axios.create({
    baseURL,
});

const setAuthHeader = (token) => {
    client.defaults.headers.common['Authorization'] = token;
}

client.login = (credentials) => {
    return client.post(`/auth`, credentials)
        .then((response) => {
            setAuthHeader(response.tokenJWT);
            return response.tokenJWT;
        })
        .catch((error) => {
            return error;
        })
}

export default client;