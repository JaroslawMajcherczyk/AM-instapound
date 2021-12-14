import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import PostComponent from './PostComponent'

const AddNewPost = () => (
    <View style={styles.container}>
    <PostComponent/>
    </View>
)

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 10
    }
})

export default AddNewPost

