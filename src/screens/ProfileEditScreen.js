import React from 'react'
import { Text, SafeAreaView} from 'react-native'
import GlobalStyles from "../utils/GlobalStyles";

const ProfileEditScreen = () => {
    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <Text>Here you will edit your profile!</Text>
        </SafeAreaView>
    )
}

export default ProfileEditScreen
