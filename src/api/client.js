import axios from 'axios';

const { REACT_APP_API_URL: baseURL } = process.env;

const client = axios.create({
    baseURL,
});

const setAuthorizationHeader = (token) => {
    client.defaults.headers.common['Authorization'] = token;
}

client.login = (credentials) => {
    return client.post(`/auth`, credentials)
        .then((response) => {
            setAuthorizationHeader(response.data.tokenJWT);
            return response.data.tokenJWT;
        })
        .catch((error) => {
            return error;
        })
}

export const configureClient = token => {
    if (token) {
        setAuthorizationHeader(token);
    }
};

export default client;