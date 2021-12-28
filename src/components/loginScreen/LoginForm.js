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
import Toast from 'react-native-root-toast'

import UserAuthorization from '../../utils/UserAuthorization'
import {Button} from "native-base";


const processLoginForm = (username, password, navigateToHome, resetForm) => {
    UserAuthorization.requestUserAuthorization(username, password)
        .then(response => {
            if (response.status === 200) {
                UserAuthorization.loginUser(response.token);
                Toast.show(`Hello ${username}!`, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                });
                resetForm();
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
        email: Yup.string().required('An email/username is required to log in!'),
        password: Yup.string()
        .required()
        .min(8,'Your password should be at least 8 characters long!')
    })

    return (
        <View style={styles.inputWrapper}>
        <Formik
        initialValues={{email:'', password: ''}}
        onSubmit={ (values, {resetForm}) => {
            processLoginForm(values.email, values.password, navigateToHome, resetForm);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
        >
        {({handleChange, handleBlur, handleSubmit, values, isValid}) =>(
        
            <SafeAreaView>
            <View style={[styles.inputField, {borderColor: "#ccc"}]}>
            <TextInput 
            placeholderTextColor='#444'
            placeholder='Username or email'
            autoCapitalize='none'
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
                    0 === values.password.length || values.password.length > 7
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

            <Button size="lg" onPress={handleSubmit} isDisabled={!isValid}>
                Log in
            </Button>

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
