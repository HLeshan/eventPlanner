import isEmpty from 'lodash/isEmpty';
import take from 'lodash/take';

import AxiosInstance from './baseService';
import {logError} from '~/utils/Logger';
import useDashboardStore from '~/models/DashboardStore';

export type Photo = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
};

export const getBanners = async () => {
    try {
        const response = (await AxiosInstance.get('photos')) as Photo[];
        if (!isEmpty(response)) {
            return take(response, 10);
        }
    } catch (error) {
        logError('getBanners', error);
    }
};

export type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
};

export type EventUser = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};

export const getEvents = async () => {
    try {
        const response = (await AxiosInstance.get('users')) as EventUser[];
        if (!isEmpty(response)) {
            useDashboardStore.getState().setEventUsers(response);
        }
    } catch (error) {
        logError('getEvents', error);
    }
};

export const getPhotos = async () => {
    try {
        const response = (await AxiosInstance.get('photos')) as Photo[]; //same service as getBanners
        if (!isEmpty(response)) {
            return take(response, 10);
        }
    } catch (error) {
        logError('getPhotos', error);
    }
};

export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export const getPosts = async () => {
    try {
        const response = (await AxiosInstance.get('posts')) as Post[];
        if (!isEmpty(response)) {
            useDashboardStore.getState().setPosts(response);
        }
    } catch (error) {
        logError('getPosts', error);
    }
};

export type Comment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

export const getComments = async () => {
    return (await AxiosInstance.get('comments')) as Comment[];
};
