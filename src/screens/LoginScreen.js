import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import LoginForm from '../components/loginScreen/LoginForm'

const Instagram_logo = 'https://static.wirtualnemedia.pl/media/top/instagram2016-logo655.png'

const LoginScreen = ({navigation}) => (
    
        <View style={styles.container}>
            {/**INSTAGRAM_ICON */}
            <View style={styles.logoConatiner}>
            <Image source={{uri: Instagram_logo, height:100, width:100 }}/>
            </View>

            <LoginForm navigateToHome={() => navigation.navigate('Home')}/>

            <View style={styles.signupRedirect}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('Signup')}}>
                    <Text style={{color: '#6bb0f5'}}>  Sign Up</Text>
                </TouchableOpacity>
            </View>
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
    signupRedirect: {
        flexDirection: 'row',
        marginTop:30,
        justifyContent: 'center'
    },
})    


export default LoginScreen
