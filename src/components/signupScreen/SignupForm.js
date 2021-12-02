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




const SignupForm = () => {

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(3, 'A username is required'),
        password: Yup.string()
        .required()
        .min(6,'Your passwoerd has to have leasr 6 characters ')
    })

    return (
        <View style={styles.inputWrapper}>
        <Formik
        initialValues={{email:'', username:'', password: ''}}
        onSubmit={(value) => {
            console.log(value)
        }}
        validationSchema={SignupFormSchema}
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
            
            
            <Pressable
            titleSize={20}
            style={styles.loginButton(isValid)}
            onPress={handleSubmit}
            disabled={!isValid}
        
            >
            <Text style={styles.buttonText}>Sign Up</Text>
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
