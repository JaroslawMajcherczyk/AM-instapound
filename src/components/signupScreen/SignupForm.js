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
import {Button} from "native-base";
import ApiCalls from "../../utils/ApiCalls";
import UserAuthorization from "../../utils/UserAuthorization";
import UserLogin from "../../utils/UserLogin";
import Toast from "react-native-root-toast";




const SignupForm = ({navigateToHome}) => {

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(3, 'A username is required'),
        password: Yup.string()
        .required()
        .min(8,'Your password has to be at least 8 characters long '),
        confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    return (
        <View style={styles.inputWrapper}>
        <Formik
        initialValues={{email:'', username:'', password: '', confirmPassword: ''}}
        onSubmit={async (values, {resetForm}) => {
            const registrationResponse = await ApiCalls.registerUser(values.email, values.username, values.password, values.confirmPassword);
            if (registrationResponse.status === 'success') {
                const loginResponse = await UserAuthorization.requestUserAuthorization(values.username, values.password)
                await UserLogin.loginUser(loginResponse.token);
                Toast.show(`Hello ${values.username}!`, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                });
                resetForm();
                navigateToHome();
            } else {
                let errors = [];
                for (let field in registrationResponse.errors) {
                    errors.push(`${field}: ${registrationResponse.errors[field][0]}`)
                }

                Toast.show(errors.join('\n'), {
                    backgroundColor: 'red',
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                });
            }
        }}
        validationSchema={SignupFormSchema}
        validateOnMount={true}
        >
        {({handleChange, handleBlur, handleSubmit, values, isValid, errors}) =>(
        
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
            placeholder='Email'
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
                    1 > values.username.length || values.username.length > 3
                    ? "#ccc"
                     : 'red',
                    },
                ]}>
            <TextInput
            placeholderTextColor='#444'
            placeholder='Username'
            autoCapitalize='none'
            textContentType='username'
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
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

                <View>
                    <View style={[
                        styles.inputField,
                        {
                            borderColor:
                                values.confirmPassword.length === 0 || values.password === values.confirmPassword
                                    ? "#ccc"
                                    : 'red',
                            marginBottom: errors.confirmPassword ? 2 : 12
                        },
                    ]}>
                        <TextInput
                            placeholderTextColor='#444'
                            placeholder='Confirm password'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType='password'
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                        />
                    </View>
                    {errors.confirmPassword && (
                        <Text style={{fontSize: 10, color: 'red', marginBottom: 10, paddingLeft: 2}}>
                            {errors.confirmPassword}
                        </Text>
                    )}
                </View>

            <Button size="lg" onPress={handleSubmit} isDisabled={!isValid}>
                Sign Up
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
    padding: 8,
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

export default SignupForm
