import React, {useEffect, useState} from 'react'
import {StyleSheet, SafeAreaView, FlatList, RefreshControl, View, Image, Pressable} from 'react-native'
import ApiCalls from "../utils/ApiCalls";

const MyPicturesScreen = ({navigation}) => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const updatePosts = async () => {
        const data = await ApiCalls.getMyPictureList();
        setPosts(data);
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await updatePosts()
        setRefreshing(false);
    }, [refreshing]);

    // pobieramy z API posty
    useEffect(() => {
        updatePosts()
    }, []);

    return (
        <FlatList
            contentContainerStyle={{flex: 1}}
            // columnWrapperStyle={{justifyContent: "space-evenly"}}
            numColumns={3}
            data={posts}
            renderItem={({item}) => (
                <Pressable onPress={() => console.log(item.id)}>
                    <Image
                        style={{margin: 1, width: 130, height: 130}}
                        source={{uri: item.picture}}
                    />
                </Pressable>
            )}
            keyExtractor={post => post.id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    }
})


export default MyPicturesScreen
