// import { Advert, AdvertsCollection } from '../models/models';
import client from './client';

export const getAdverts = () => {
    const url = `/ads`;
    return client.get(url)
    .then(response => {
        return response.data.result.ads;
    })
    .catch(err => {
        return null;
    });
}

export const getAdvertDetail = (advertId) => {
    const url = `/ads/${advertId}`;
    return client.get(url)
    .then(response => {
        return response.data;
    })
    .catch(err => {
        return null;
    });
}

export const deleteAdvert = (advertId) => {
    const url = `/ads/${advertId}`;
    return client.delete(url);
}

export const createAdvert = (advertData) => {
    const url = `/ads/`;
    return client.post(url, advertData);
}