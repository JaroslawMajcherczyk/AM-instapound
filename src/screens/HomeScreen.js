import React, {useEffect, useState} from 'react'
import {StyleSheet, SafeAreaView, FlatList, RefreshControl} from 'react-native'
import Header from '../components/Home/Header.js'
import GlobalStyles from "../utils/GlobalStyles";
import ApiCalls from "../utils/ApiCalls";
import {PostListItem} from "../components/Post"

const HomeScreen = ({navigation}) => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const updatePosts = async () => {
        const data = await ApiCalls.getPictureList();
        setPosts(data);
        console.log("UPDATING POSTS");
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await updatePosts()
        setRefreshing(false);
    }, [refreshing]);

    // pobieramy z API posty
    useEffect(() => {updatePosts()}, []);

    return (
        <SafeAreaView style={[GlobalStyles.droidSafeArea, styles.container]}>
            <Header navigation={navigation}/>
            <FlatList
                data={posts}
                renderItem={({item}) => <PostListItem post={item}/>}
                keyExtractor={post => post.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
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
