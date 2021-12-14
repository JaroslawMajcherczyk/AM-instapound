import React, {useState} from 'react'
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { TextInput } from 'react-native-gesture-handler'
import { Button, Divider } from 'react-native-elements'
import GlobalStyles from "../../utils/GlobalStyles";

const PLACEHOLDER_IMG = 'https://galeria-wisla.pl/wp-content/uploads/2020/12/placeholder.png'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reach the character limit'),
})


const PostComponent = () => {

    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)

    return (
        <Formik
        initialValues={{caption: '', imageUrl: ''}}
        onSubmit={(values) => console.log(values)}
        validationSchema={uploadPostSchema}
        validateOnMount={true}
        >
        
            {({handleBlur,
             handleChange, 
             handleSubmit, 
             values, 
             errors, 
             isValide
        }) => (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={{margin: 10,
            justifyContent: 'space-between',
            flexDirection: 'row'}}>
            <Image source={{uri: thumbnailUrl ? thumbnailUrl: PLACEHOLDER_IMG}}
            style={{width: 200, height: 180}}
            />
            
            <Divider width={0.2} 
            orientation='vertical' />

            <View style={{flex: 1, marginLeft: 12}}>
            <TextInput placeholder='Write a caption...'
            placeholderTextColor='grey'
            multiline={true}
            style={{fontSize: 20}}
            onChangeText={handleChange('caption')}
            onBlur={handleBlur('caption')}
            value={values.caption}
            />
              </View>        
            </View>


            <Divider width={0.2} 
            orientation='vertical' />


            <TextInput
            onChange={e => setThumbnailUrl(e.nativeEvent.text)}
            placeholder='Enter Image Url:'
            style={{fontSize: 16}}
            placeholderTextColor='grey'
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
            />   

            
            {errors.imageUrl && (
                <Text style={{fontSize: 10, color: 'red'}}>
                {errors.imageUrl}
                </Text>
            )}
               <Button
               style={{marginTop: 20}}
               onPress={handleSubmit} title='Share' disable={!isValide}/>

            </SafeAreaView>

         
            )}

        </Formik>
    )
}

export default PostComponent