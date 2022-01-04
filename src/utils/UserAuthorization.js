import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

const AUTHORIZATION_KEY = 'user_auth_token';
const USER_ID = 'user_id';
const API_AUTH_TOKEN_URL = 'https://eryknn2.eu.pythonanywhere.com/api/auth-token/';

const getUserAuthToken = async () => {
    return await SecureStore.getItemAsync(AUTHORIZATION_KEY);
}

const setUserAuthToken = async (value) => {
    if (value !== '' && value !== null && value !== undefined)
        await SecureStore.setItemAsync(AUTHORIZATION_KEY, value)
    else
        await SecureStore.deleteItemAsync(AUTHORIZATION_KEY);
}

const isUserLoggedIn = async () => {
    return await getUserAuthToken() !== null;
}

const getUserId = async () => {
    return await SecureStore.getItemAsync(USER_ID);
}

const setUserId = async (value) => {
    if (value !== '' && value !== null && value !== undefined)
        await SecureStore.setItemAsync(USER_ID, value)
    else
        await SecureStore.deleteItemAsync(USER_ID);
}

const requestUserAuthorization = (login, password) => {
    return axios.post(API_AUTH_TOKEN_URL, {
            username: login,
            password: password
        }
    ).then(response => {
        return {status: 200, token: response.data.token}
    }).catch(error => {
        if (error.response && error.response.status === 400){
            return {status: 400}
        } else
            return {status: 500}
    })

}

export default {requestUserAuthorization, getUserAuthToken, setUserAuthToken, isUserLoggedIn, getUserId, setUserId}