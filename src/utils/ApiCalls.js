import * as React from 'react';
import axios from "axios";
import UserAuthorization from "./UserAuthorization";

const BASE_API_URL = 'https://eryknn2.eu.pythonanywhere.com/api';
const REGISTER_URL = `${BASE_API_URL}/users/register/`;
const PICTURE_URL = `${BASE_API_URL}/pictures/`;


const registerUser = (email, username, password, confirmPassword) => {
    return axios.post(REGISTER_URL, {
            email: email,
            username: username,
            password: password,
            confirm_password: confirmPassword
        }
    ).then(response => {
        return {status: 'success'}
    }).catch(error => {
        if (error.response && error.response.status === 400){
            return {status: 'failed', errors: error.response.data}
        } else
            return {status: 500, errors: {failed: ['Please contact application administrators!']}}
    })
}

const getPictureList = async (userId=null) => {
    const authToken = await UserAuthorization.getUserAuthToken();
    const response = await axios.get(PICTURE_URL, {
        params: {
            uploaded_by: userId
        },
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })

    return response.data;
}

export default {registerUser, getPictureList}