import React from 'react'
import { Button, StyleSheet, SafeAreaView} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const nav = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Button title="Edit Profile" onPress={() => nav.navigate('ProfileEdit')} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: 'white',
        flex: 1,
    }
})



export default ProfileScreen
