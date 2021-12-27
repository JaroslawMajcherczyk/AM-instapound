import React, {useEffect, useRef, useState} from 'react'
import {Image, StyleSheet, Platform, KeyboardAvoidingView, Alert} from 'react-native'
import {Button, TextArea, View} from "native-base";
import * as ImagePicker from 'expo-image-picker';
import ApiCalls from "../utils/ApiCalls";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-root-toast";

const MyProfileEditScreen = () => {
    const nav = useNavigation();
    const [statusCamera, requestCameraPermission] = ImagePicker.useCameraPermissions();

    const [picture, setPicture] = useState(null);
    const [bio, setBio] = useState('')

    const source = picture !== null ? {uri: picture} : require('../../assets/images/user-placeholder.png');

    const onTakePicture = async () => {
        if (!statusCamera.granted) {
            Alert.alert("Permission Required", "Camera permissions are required for this action!")
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1.91, 1],
            quality: 0.3,
        });

        console.log(result);

        if (!result.cancelled) {
            setPicture(result.uri);
        }
    }

    const onSelectPicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1.91, 1],
            quality: 0.3,
        });

        if (!result.cancelled) {
            setPicture(result.uri);
        }
    }

    const submit = async () => {
        const result = await ApiCalls.updateProfile(picture, bio);
        if (result === 'success') {
            nav.goBack();
        } else if (result === 'error') {
            Toast.show('Try other picture!', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
            });
        } else {
            Toast.show('Service is temporarily down! Please contact authors!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
            });
        }

    }

    useEffect(() => {
        requestCameraPermission();
    }, [])

    return (
        <KeyboardAvoidingView
            style={{flex: 1, alignItems: "center"}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={{alignItems: "center", marginVertical: 10}}>
                <Image source={source} style={styles.picture}/>
                <Button.Group size="sm" style={{marginTop: 5}}>
                    <Button onPress={onTakePicture}>Take a picture</Button>
                    <Button onPress={onSelectPicture}>Select picture</Button>
                </Button.Group>
            </View>
            <TextArea onChangeText={text => setBio(text)} h={180} placeholder={"Set your bio here!"} w={350}/>
            <Button width={350} style={styles.bottomButton} onPress={submit}>Save</Button>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    picture: {
        width: 300,
        height: 300,
        borderWidth: 3,
        borderColor: '#444',
    },
    center: {
        alignItems: 'center'
    },
    bottomButton: {
        marginTop: 20
    },
});

export default MyProfileEditScreen
