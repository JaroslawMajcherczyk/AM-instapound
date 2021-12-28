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
import MyProfileScreen from "../screens/MyProfileScreen";
import MyProfileEditScreen from "../screens/MyProfileEditScreen";
import AppInformationScreen from "../screens/AppInformationScreen";
import MyPicturesScreen from "../screens/MyPicturesScreen";
import PostDetailScreen from "../screens/PostDetailScreen";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ProfileNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="My Profile" options={{headerShown: false}} component={MyProfileScreen}/>
            <Stack.Screen name="Edit Profile" component={MyProfileEditScreen}/>
        </Stack.Navigator>
    );
}

function PictureNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tabs" options={{headerShown: false}} component={TabNavigator}/>
            <Stack.Screen name="Post Detail" component={PostDetailScreen}/>
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
                name="My Pictures" component={MyPicturesScreen}
                options={{
                    headerShown: true,
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
        <Drawer.Navigator drawerContent={CustomDrawerContent}>
            <Drawer.Screen options={{headerShown: false}} name="Home" component={PictureNavigator}/>
            <Drawer.Screen options={{headerShown: false}} name="Profile" component={ProfileNavigator}/>
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
            <Stack.Navigator
                screenOptions={{headerShown: false}}
                initialRouteName={userLoggedIn ? 'App' : 'Login'}
            >
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Signup" component={SignupScreen}/>
                <Stack.Screen name="App" component={DrawerNav}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}