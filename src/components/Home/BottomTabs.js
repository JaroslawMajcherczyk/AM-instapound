import React, {useState} from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Divider } from 'react-native-elements'
import { Image } from 'react-native-elements/dist/image/Image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { bottomTabIcons } from '../Data/bottomTabIcons'


const BottomTabs = ({ icons }) => {
    const [activeTab, setActiveTab] = useState('Home')
    
    const Icon = ({icon}) => (
        
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
        <Image source={{uri: activeTab === icon.name ? icon.active : icon.inactive}}
        style={styles.icon}
        />
        
        </TouchableOpacity>
        
    )

    return (
        <View style={styles.wrapper}>
        <Divider width={1} orientation='vertical'/>
        <View style={styles.container}>
        {icons.map((icon, index) => (
            <Icon key={index} icon={icon} />
            ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {

        },

   container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 5,
   },
    icon: {
        height:35,
        width:35,
        marginBottom: 5,
    },
})




export default BottomTabs
