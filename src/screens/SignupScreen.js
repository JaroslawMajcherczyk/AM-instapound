import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import SignupForm from '../components/signupScreen/SignupForm' 

const Instagram_logo = 'https://static.wirtualnemedia.pl/media/top/instagram2016-logo655.png'

const SignupScreen = ({navigation}) => (
    
        <View style={styles.container}>
            {/**INSTAGRAM_ICON */}
            <View style={styles.logoConatiner}>
            <Image source={{uri: Instagram_logo, height:100, width:100 }}/>
            </View>
        
            <SignupForm/>

            <View style={styles.loginRedirect}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
                    <Text style={{color: '#6bb0f5'}}>  Log In</Text>
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
    loginRedirect: {
        flexDirection: 'row',
        marginTop:30,
        justifyContent: 'center'
    },
})    


export default SignupScreen
