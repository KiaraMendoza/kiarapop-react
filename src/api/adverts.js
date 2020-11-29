// import { Advert, AdvertsCollection } from '../models/models';
import client from './client';

export const getAdverts = (filters) => {
    let url;
    if (filters) { // Filters data will come as an Object, we will need to transform it to a query string
        console.log("filters", filters)
        filters = new URLSearchParams(filters).toString()
        url = `/ads?${filters}`;
    } else {
        console.log("no filters", filters)
        url = `/ads`;
    }
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
        return response.data.result;
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