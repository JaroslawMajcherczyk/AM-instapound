import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


const Header = () => {
    return (
        <View style={styles.container}>
        <TouchableOpacity>
            <Image 
            style={styles.logo}
             source={require('../../../assets/images/insta-logo.png')}
            /> 
        </TouchableOpacity>

<View style={styles.iconsContainer}>
    <TouchableOpacity>
    <Image 
    source={{ 
        uri:'https://img.icons8.com/ios/50/000000/add--v1.png'
    }}
    style={styles.icon}
    /> 
    </TouchableOpacity>
    <TouchableOpacity>
    <Image 
    source={{ 
        uri:'https://img.icons8.com/ios/50/000000/like--v1.png'
    }}
    style={styles.icon}
    /> 
    </TouchableOpacity>
    <TouchableOpacity>
    <View style={styles.unreadMessage}>
        <Text style={styles.unreadMessageText}>99</Text>
    </View>
    <Image 
    source={{ 
        uri:'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-message-chat-flatart-icons-outline-flatarticons-5.png'
    }}
    style={styles.icon}
    /> 
    </TouchableOpacity>
    
</View>
    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 30,
        height:70,
    },
    iconsContainer: {
       
        flexDirection: 'row',
        marginRight: 20,
    },
    logo: {
        marginTop: 10,
        width:150,
        height:80,
        resizeMode: 'contain',
    },
    icon:{
        width:30, 
        height:30,
        marginRight:9,
        
    },
    unreadMessage: {
        backgroundColor:'red',
        position: 'absolute',
        left: 18,
        bottom: 12,
        width:23,
        height:18,
        borderRadius:9,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    unreadMessageText: {
        color: 'white',
        fontWeight: '600',
    },
})

export default Header
