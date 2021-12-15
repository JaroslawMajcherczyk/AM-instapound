import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";


const ProfilePicture = ({username, picture}) => {

    const source = picture !== null ? {uri: picture} : require('../../../assets/images/user-placeholder.png');

    return (
        <View style={{alignItems: 'center', paddingVertical: 10}}>
            <Image source={source} style={styles.picture}/>
            <Text style={styles.userName}>{username && username.toLowerCase()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    picture:{
        width: 250,
        height:250,
        borderRadius: 125,
        borderWidth: 3,
        borderColor: '#444',
    },
    userName: {
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 15
    },
})

export default ProfilePicture;