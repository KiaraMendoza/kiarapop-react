import axios from 'axios';
import { Advert, AdvertsCollection } from '../models/models';
import client from './client';

export const getAdverts = () => {
    const url = `/ads`;
    return client.get(url);
}

export const getAdvertDetail = (advertId) => {
    const url = `/ads/${advertId}`;
    return client.get(url);
}

export const deleteAdvert = (advertId) => {
    const url = `/ads/${advertId}`;
    return client.delete(url);
}

export const createAdvert = (advertData) => {
    const url = `/ads/`;
    return client.post(url, advertData);
}