import * as React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import UserAuthorization from '../../utils/UserAuthorization'

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={() => UserAuthorization.setUserAuthToken(null).then(() => props.navigation.navigate('Login'))}
            />
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;