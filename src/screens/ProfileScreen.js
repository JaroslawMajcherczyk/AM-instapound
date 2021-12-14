import React from 'react'
import { Button, SafeAreaView} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from "../utils/GlobalStyles";

const ProfileScreen = () => {
    const nav = useNavigation();
    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <Button title="Edit Profile" onPress={() => nav.navigate('ProfileEdit')} />
        </SafeAreaView>
    )
}

export default ProfileScreen
