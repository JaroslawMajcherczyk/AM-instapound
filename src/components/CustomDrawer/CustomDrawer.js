import * as React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import UserLogin from '../../utils/UserLogin'

function CustomDrawerContent(props) {
    const logout = () => {
        UserLogin.logoutUser().then(() => {
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