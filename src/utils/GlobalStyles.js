import { StyleSheet, Platform, StatusBar } from 'react-native';

const GlobalStyles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
})

export default GlobalStyles;