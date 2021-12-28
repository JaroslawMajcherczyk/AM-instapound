import * as React from 'react';
import axios from "axios";
import uuid from 'react-native-uuid';

import UserAuthorization from "./UserAuthorization";

const BASE_API_URL = 'https://eryknn2.eu.pythonanywhere.com/api';
const REGISTER_URL = `${BASE_API_URL}/users/register/`;
const PROFILE_URL = `${BASE_API_URL}/users/profile/`;
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

const getPicture = async (pictureId) => {
    const authToken = await UserAuthorization.getUserAuthToken();
    const response = await axios.get(`${PICTURE_URL}/${pictureId}/`, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })

    return response.data;
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

const getMyPictureList = async () => {
    const userId = await UserAuthorization.getUserId();
    return await getPictureList(userId);
}

const likePicture = async (pictureId) => {
    const authToken = await UserAuthorization.getUserAuthToken();
    const likeUrl = `${PICTURE_URL}${pictureId}/like/`;
    const response = await axios.post(likeUrl,{}, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    });

    return response.status === 204;
}

const unlikePicture = async (pictureId) => {
    const authToken = await UserAuthorization.getUserAuthToken();
    const likeUrl = `${PICTURE_URL}${pictureId}/like/`;
    const response = await axios.delete(likeUrl, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    });

    return response.status === 204;
}

const getProfile = async () => {
    const authToken = await UserAuthorization.getUserAuthToken();
    const response = await axios.get(PROFILE_URL, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })

    return response.data;
}

const updateProfile = async (imageUri, bio) => {
    const authToken = await UserAuthorization.getUserAuthToken();
    const id = uuid.v4();

    let formData = new FormData();
    formData.append('description', bio);
    formData.append('picture', imageUri ? {
        uri: imageUri,
        type: 'image/jpeg',
        name: `profile-${id}.jpg`,
    } : null);


    try {
        await axios.put(PROFILE_URL, formData, {
            headers: {'Authorization': `Token ${authToken}`}
        })
        return 'success'
    } catch (e) {
        switch (e.response.status) {
            case 400:
                return 'error';
            default:
                return 'unavailable';
        }
    }
}


const uploadPicture = async (imageUri, description) => {
    const authToken = await UserAuthorization.getUserAuthToken();
    const id = uuid.v4();

    let formData = new FormData();
    formData.append('description', description);
    formData.append('picture', imageUri ? {
        uri: imageUri,
        type: 'image/jpeg',
        name: `post-${id}.jpg`,
    } : null);

    try {
        await axios.post(PICTURE_URL, formData, {
            headers: {'Authorization': `Token ${authToken}`}
        })
        return 'success'
    } catch (e) {
        switch (e.response.status) {
            case 400:
                return 'error';
            default:
                return 'unavailable';
        }
    }
}



export default {registerUser, getPictureList, getMyPictureList, getPicture, likePicture, unlikePicture, getProfile, updateProfile, uploadPicture}