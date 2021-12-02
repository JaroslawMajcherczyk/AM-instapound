import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import { USERS } from '../Data/users'



const Stories = () => {
    return (
        <View style={{ marginBottom: 13}}>
        <ScrollView horizontal 
        showsHorizontalScrollIndicator={false}>
            {USERS.map((story, index) =>(
                <View key={index} style={{alignItems: 'center'}}>
                <Image source={{ uri: story.image}}
                style={styles.story}/>
                
                <Text style={styles.userName}>{
                    story.user.length > 10 ? story.user.slice(0, 9).toLowerCase() + '...'
                    :story.user.toLowerCase()
                }</Text>

                </View> 
            ))}
        
        </ScrollView>
           
        </View>
    )
}

const styles = StyleSheet.create({
    story:{
        width: 70,
        height:70,
        borderRadius: 50,
        marginLeft: 8,
        borderWidth: 3,
        borderColor: '#444',
    },
    userName: {
        alignItems: 'center',
    },
})

export default Stories
