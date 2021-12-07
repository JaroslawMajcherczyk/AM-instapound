import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import HomeScreen from '../screens/HomeScreen'
import PostScreen from '../screens/PostScreen'
import CustomDrawerContent from "../components/CustomDrawer";
import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import UserAuthorization from '../utils/UserAuthorization'


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function DrawerNav() {
    return (
        <Drawer.Navigator drawerContent={CustomDrawerContent}>
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Post" component={PostScreen}/>
        </Drawer.Navigator>
    );
}


export default function Navigation() {
    const [applicationLoading, setApplicationLoading] = useState(true);
    let userLoggedIn = false;

    useEffect(() => {
        UserAuthorization.isUserLoggedIn().then(value => {
            userLoggedIn = value;
            setApplicationLoading(false);
        })
    })

    if (applicationLoading)
        return <View><Text>SPLASH SCREEN</Text></View>

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={userLoggedIn ? 'App' : 'Login'}>
                <Stack.Screen options={{
                    headerShown: false
                }} name="Login" component={LoginScreen}/>
                <Stack.Screen options={{
                    headerShown: false
                }} name="Signup" component={SignupScreen}/>
                <Stack.Screen options={{
                    headerShown: false
                }} name="App" component={DrawerNav}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}