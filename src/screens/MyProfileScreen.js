import React, {useEffect, useState} from 'react'
import {SafeAreaView, StyleSheet, Text, View} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import {ProfilePicture} from "../components/Profile"
import ApiCalls from "../utils/ApiCalls";
import GlobalStyles from "../utils/GlobalStyles";
import {Icon, IconButton} from "native-base";
import {FontAwesome} from "@expo/vector-icons";

const EditButton = ({onPress, style}) => {
    return (
        <IconButton
            style={style}
            size={"sm"}
            icon={<Icon as={FontAwesome} size={29} name="edit"/>}
            _pressed={{
                bgColor: 'gray.100'
            }}
            onPress={onPress}
        />
    );
}

const MyProfileScreen = () => {
    const nav = useNavigation();
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const profile = await ApiCalls.getProfile();
            setUser(profile);
        }
        getUser();
    }, []);

    return (
        <SafeAreaView style={[GlobalStyles.droidSafeArea, {marginTop: 5}]}>
            <View>
                <ProfilePicture username={user.username} picture={user.picture}/>
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>{user.description}</Text>
                </View>
                <EditButton style={styles.editButton} onPress={() => nav.navigate('Edit Profile')}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    descriptionBox: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 25
    },
    descriptionText: {
        fontSize: 19
    },
    editButton: {
        position: 'absolute',
        left: '90%',
        top: 5
    }
})

export default MyProfileScreen
