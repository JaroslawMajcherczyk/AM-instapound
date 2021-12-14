import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import HomeScreen from '../screens/HomeScreen'
import PostScreen from '../screens/PostScreen'
import CustomDrawerContent from "../components/CustomDrawer";
import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import UserAuthorization from '../utils/UserAuthorization'
import ProfileScreen from "../screens/ProfileScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import AppInformationScreen from "../screens/AppInformationScreen";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ProfileNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileView" component={ProfileScreen}/>
            <Stack.Screen name="ProfileEdit" component={ProfileEditScreen}/>
        </Stack.Navigator>
    );
}


function TabNavigator() {
    const getIconColor = (focused) => {
        return focused ? 'black' : 'grey'
    };
    const getIconSize = (focused) => {
        return focused ? 25 : 20
    };
    return (
        <Tab.Navigator screenOptions={{tabBarShowLabel: false, headerShown: false}}>
            <Tab.Screen
                name="Home Screen" component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <FontAwesome5 name="home" size={getIconSize(focused)} color={getIconColor(focused)}/>
                    }
                }}
            />
            <Tab.Screen
                name="New Photo" component={PostScreen}
                options={{
                    headerShown: true,
                    tabBarIcon: ({focused}) => {
                        return <FontAwesome5 name="camera" size={getIconSize(focused)} color={getIconColor(focused)}/>
                    }
                }}
            />
            <Tab.Screen
                name="My Pictures" component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <FontAwesome5 name="user" size={getIconSize(focused)} color={getIconColor(focused)}/>
                    }
                }}
            />
        </Tab.Navigator>
    );
}

function DrawerNav() {
    return (
        <Drawer.Navigator drawerContent={CustomDrawerContent} screenOptions={{headerShown: false}}>
            <Drawer.Screen name="Home" component={TabNavigator}/>
            <Drawer.Screen name="Profile" component={ProfileNavigator}/>
            <Drawer.Screen name="About" component={AppInformationScreen}/>
        </Drawer.Navigator>
    );
}


export default function Navigation() {
    const [applicationLoading, setApplicationLoading] = useState(true);
    const [userLoggedIn, setUserLoggedIn] = useState(true);

    useEffect(() => {
        UserAuthorization.isUserLoggedIn().then(value => {
            setUserLoggedIn(value);
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