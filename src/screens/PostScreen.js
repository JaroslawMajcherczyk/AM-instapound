import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import AddNewPost from '../components/newPost/AddNewPost'

const PostScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <AddNewPost navigation={navigation}/>
        </SafeAreaView>
    )
}

export default PostScreen
