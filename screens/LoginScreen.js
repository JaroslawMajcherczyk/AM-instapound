import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import LoginForm from '../components/loginScreen/LoginForm'

const Instagram_logo = 'https://static.wirtualnemedia.pl/media/top/instagram2016-logo655.png'

const LoginScreen = (navigation) => (
    
        <View style={styles.container}>
            {/**INSTAGRAM_ICON */}
            <View style={styles.logoConatiner}>
            <Image source={{uri: Instagram_logo, height:100, width:100 }}/>
            </View>
            <LoginForm/>
        </View>
    )
const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
},

logoConatiner: {
        alignItems: 'center',
        marginTop: 70,
    
},

})    


export default LoginScreen
