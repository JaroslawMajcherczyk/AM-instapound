import * as React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import UserAuthorization from '../../utils/UserAuthorization'

function CustomDrawerContent(props) {
    const logout = () => {
        UserAuthorization.setUserAuthToken(null).then(() => {
            props.navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
        })
    }
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={logout}
            />
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;