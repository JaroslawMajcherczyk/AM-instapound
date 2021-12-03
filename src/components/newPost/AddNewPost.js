import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PostComponent from './PostComponent'

const AddNewPost = ({navigation}) => (
    <View style={styles.container}>
    <Header navigation={navigation}/>
    <PostComponent/>
    </View>
)
   


const Header = ({navigation}) => (

    <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => {navigation.navigate('Home')}}> 
    <Image source={{uri: 'https://img.icons8.com/ios/50/000000/circled-left-2.png'}}
    style={{width: 35,
    height: 35}}
    />
    </TouchableOpacity>


    <Text style={styles.headerText}>Add new post</Text>
    <Text></Text>
    </View>

)

const styles = StyleSheet.create ({

    container: {
        marginLeft: 20,
        marginTop:80,
        marginHorizontal: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontWeight: '700',
        fontSize: 30,
        marginRight: 20,
    },
})

export default AddNewPost

