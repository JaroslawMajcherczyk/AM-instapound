import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, SafeAreaView,} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {bottomTabIcons} from '../components/Data/bottomTabIcons.js'
import {POSTS} from '../components/Data/post.js'
import BottomTabs from '../components/Home/BottomTabs.js'
import Header from '../components/Home/Header.js'
import Post from '../components/Home/Post.js'
import GlobalStyles from "../utils/GlobalStyles";
import ApiCalls from "../utils/ApiCalls";
import {PostListItem} from "../components/Post"

const HomeScreen = ({navigation}) => {
    const [posts, setPosts] = useState([]);

    const reloadPosts = () => {
        const requestPosts = async () => {
            const data = await ApiCalls.getPictureList();
            setPosts(data);
            console.log(data);
        }
        requestPosts();
    };

    // pobieramy z API posty
    useEffect(reloadPosts, []);

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <Header navigation={navigation}/>
            <ScrollView>
                {posts.map((post) => (
                    <PostListItem post={post} key={post.id}/>
                ))}

                {/*{POSTS.map((post, index) => (*/}
                {/*    <Post post={post} key={index}/>*/}
                {/*))}*/}

            </ScrollView>
            {/*<BottomTabs icons={bottomTabIcons}/>*/}

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
