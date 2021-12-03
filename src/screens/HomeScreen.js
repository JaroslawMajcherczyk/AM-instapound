import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { bottomTabIcons } from '../components/Data/bottomTabIcons.js'
import { POSTS } from '../components/Data/post.js'
import BottomTabs from '../components/Home/BottomTabs.js'
import Header from '../components/Home/Header.js'
import Post from '../components/Home/Post.js'

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
       <Header navigation={navigation}/>

       <ScrollView>
        {POSTS.map((post, index) => (
            <Post post={post} key={index} />
        ))}
            
       </ScrollView>
       <BottomTabs icons={bottomTabIcons}/>
       
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: 'white',
        flex: 1,
    }
})



export default HomeScreen
