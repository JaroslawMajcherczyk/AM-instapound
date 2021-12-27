import React, {useRef, useState} from 'react'
import {Image, StyleSheet, Platform, KeyboardAvoidingView} from 'react-native'
import {Button, TextArea, View} from "native-base";

const MyProfileEditScreen = () => {
    const [picture, setPicture] = useState(null);
    const [bio, setBio] = useState(null)

    const source = picture !== null ? {uri: picture} : require('../../assets/images/user-placeholder.png');



    const submit = () => {
        console.log(picture)
        console.log(bio)
    }

    return (
            <KeyboardAvoidingView
                style={{flex: 1, alignItems: "center"}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={{alignItems: "center", marginVertical: 15}}>
                    <Image source={source} style={styles.picture}/>
                    <Button.Group size="sm" style={{marginTop: 5}}>
                        <Button>Take a picture</Button>
                        <Button>Select picture</Button>
                    </Button.Group>
                </View>
                <TextArea onChangeText={text => setBio(text)} h={220} placeholder={"Set your bio here!"} w={350}/>
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
        position: 'relative',
        top: 25
    },
});

export default MyProfileEditScreen
