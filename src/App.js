import React from 'react'
import {RootSiblingParent} from 'react-native-root-siblings';

// import SignedInStack from './screens/navigation'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import HomeScreen from './screens/HomeScreen'
import {View, Text} from 'react-native'
import Navigation from "./navigation/Navigation";
import UserAuthorization from "./utils/UserAuthorization";

export default function App() {
    UserAuthorization.getUserAuthToken().then((val) => console.log(val));
    return (
        <RootSiblingParent>
            <Navigation/>
        </RootSiblingParent>
    )
}
