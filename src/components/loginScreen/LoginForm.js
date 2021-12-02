import React, {useState} from 'react'
import { View, 
    Text, 
    Pressable, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity,
     SafeAreaView } from 'react-native'

import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator  from 'email-validator'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-root-toast'

import UserAuthorization from '../../utils/UserAuthorization'


const processLoginForm = (username, password, navigateToHome) => {
    UserAuthorization.requestUserAuthorization(username, password)
        .then(response => {
            if (response.status === 200) {
                UserAuthorization.setUserAuthToken(response.token);
                Toast.show(`Hello ${username}!`, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                });
                navigateToHome();
            } else if (response.status === 400) {
                Toast.show('Could not log in with provided data, please make sure its valid and try again.', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.CENTER,
                });
            } else {
                Toast.show('Service is temporarily down! Please contact authors!', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.TOP,
                });
            }
        })
}


const LoginForm = ({navigateToHome}) => {

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string()
        .required()
        .min(6,'Your passwoerd has to have leasr 6 characters ')
    })

    return (
        <View style={styles.inputWrapper}>
        <Formik
        initialValues={{email:'', password: ''}}
        onSubmit={ (values) => {
            processLoginForm(values.email, values.password, navigateToHome);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
        >
        {({handleChange, handleBlur, handleSubmit, values, isValid}) =>(
        
            <SafeAreaView>
            <View style={[styles.inputField,
            {borderColor: 
                values.email.length < 1 || Validator.validate(values.email) 
                ? "#ccc"
                 : 'red',
                },
            ]}>
            <TextInput 
            placeholderTextColor='#444'
            placeholder='Phone number, username or email'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={true}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            />
            
            </View>


            <View style={[
                styles.inputField,
                {
                    borderColor: 
                    1 > values.password.length || values.password.length > 5
                    ? "#ccc"
                     : 'red',
                    },
                ]}>
            <TextInput
            placeholderTextColor='#444'
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            textContentType='password'
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            />
            
            </View>
            <View style={{ alignItems:'flex-end', marginBottom: 30}}>
            <Text style={{color: '#6bb0f5'}}>Forgot password?</Text>
            </View>
            
            <Pressable
            titleSize={20}
            style={styles.loginButton(isValid)}
            onPress={handleSubmit}
            disabled={!isValid}
        
            >
            <Text style={styles.buttonText}>Log in</Text>
            </Pressable>
            


           </SafeAreaView>
        )}
        
        
     </Formik>
        </View>
    )
}

const styles = StyleSheet.create({

inputWrapper: {
marginTop: 40,
},
inputField: {
    borderRadius:5,
    padding: 12,
    borderColor: '#fafafa',
    marginBottom: 12,
    borderWidth: 4,
},
signupContainer: {
    flexDirection: 'row',
    marginTop:30,
    justifyContent: 'center'
},
loginButton: isValid => ({
    backgroundColor: isValid ? '#0096F6' : '#9acaf7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4.
}),
buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
},
})

export default LoginForm
