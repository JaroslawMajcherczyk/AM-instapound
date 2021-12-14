import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import AddNewPost from '../components/newPost/AddNewPost'
import GlobalStyles from "../utils/GlobalStyles";

const PostScreen = ({navigation}) => {
    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <AddNewPost navigation={navigation}/>
        </SafeAreaView>
    )
}

export default PostScreen
