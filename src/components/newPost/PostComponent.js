import React, {useEffect, useState} from 'react'
import {View, Text, Image, StyleSheet, SafeAreaView, Alert} from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {TextInput} from 'react-native-gesture-handler'
import {Divider} from 'react-native-elements'
import * as ImagePicker from "expo-image-picker";
import {useNavigation} from "@react-navigation/native";
import {Button} from "native-base";
import ApiCalls from "../../utils/ApiCalls";
import Toast from "react-native-root-toast";

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().required('An Image is required'),
    caption: Yup.string().max(2200, 'Caption has reach the character limit'),
})


const PostComponent = () => {
    const nav = useNavigation();
    const [statusCamera, requestCameraPermission] = ImagePicker.useCameraPermissions();

    const [thumbnailUrl, setThumbnailUrl] = useState(null)
    const source = thumbnailUrl !== null ? {uri: thumbnailUrl} : require('../../../assets/images/image-placeholder.png');

    const onTakePicture = async () => {
        if (!statusCamera.granted) {
            Alert.alert("Permission Required", "Camera permissions are required for this action!")
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1.91, 1],
            quality: 0.3,
        });

        if (!result.cancelled) {
            setThumbnailUrl(result.uri);
            return result.uri;
        }
    }

    const onSelectPicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1.91, 1],
            quality: 0.3,
        });

        if (!result.cancelled) {
            setThumbnailUrl(result.uri);
            return result.uri;
        }
    }

    const onSubmit = async ({caption, imageUrl}, {resetForm}) => {
        const result = await ApiCalls.uploadPicture(imageUrl, caption);
        if (result === 'success') {
            Toast.show('Picture uploaded!', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
            });
            resetForm();
            setThumbnailUrl(null);
            nav.navigate('Home Screen');
        } else if (result === 'error') {
            Toast.show('Try other picture!', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
            });
        } else {
            Toast.show('Service is temporarily down! Please contact authors!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
            });
        }
    }

    useEffect(() => {
        requestCameraPermission();
    }, [])

    return (
        <Formik
            initialValues={{caption: '', imageUrl: ''}}
            onSubmit={onSubmit}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >

            {({
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  isValid
              }) => (
                <View>
                    <View style={{
                        margin: 10,
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}>
                        <Image source={source} style={{width: 200, height: 180}}/>

                        <Divider width={0.2}
                                 orientation='vertical'/>

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
                    {errors.imageUrl && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                            {errors.imageUrl}
                        </Text>
                    )}

                    <Button.Group size="sm" style={{marginTop: 5, alignSelf: "center"}}>
                        <Button onPress={async () => {
                            let res = await onTakePicture();
                            if (res)
                                handleChange('imageUrl')(res)
                        }}>
                            Take a picture
                        </Button>
                        <Button onPress={async () => {
                            let res = await onSelectPicture();
                            if (res)
                                handleChange('imageUrl')(res)
                        }}>
                            Select picture
                        </Button>
                    </Button.Group>

                    <Divider style={{marginVertical: 20}} width={0.2} orientation='horizontal'/>

                    <Button onPress={handleSubmit} isDisabled={!isValid}>
                        Share
                    </Button>

                </View>


            )}

        </Formik>
    )
}

export default PostComponent