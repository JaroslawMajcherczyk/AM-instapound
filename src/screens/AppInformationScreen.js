import React from 'react'
import {Text, StyleSheet, SafeAreaView} from 'react-native'
import GlobalStyles from '../utils/GlobalStyles';


const AppInformationScreen = () => {
    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <Text>Here you will see information about application!</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    }
})


export default AppInformationScreen
