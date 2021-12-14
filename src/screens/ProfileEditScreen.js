import React from 'react'
import { Text, StyleSheet, SafeAreaView} from 'react-native'

const ProfileEditScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Here you will edit your profile!</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: 'white',
        flex: 1,
    }
})



export default ProfileEditScreen
