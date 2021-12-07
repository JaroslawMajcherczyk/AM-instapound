import React from 'react'
import {RootSiblingParent} from 'react-native-root-siblings';

// import SignedInStack from './screens/navigation'
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
