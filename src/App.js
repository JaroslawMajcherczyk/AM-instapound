import React from 'react'
import {RootSiblingParent} from 'react-native-root-siblings';

// import SignedInStack from './screens/navigation'
import Navigation from "./navigation/Navigation";

export default function App() {
    return (
        <RootSiblingParent>
            <Navigation/>
        </RootSiblingParent>
    )
}
