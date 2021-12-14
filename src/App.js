import React from 'react'
import {RootSiblingParent} from 'react-native-root-siblings';
import {NativeBaseProvider} from 'native-base';

// import SignedInStack from './screens/navigation'
import Navigation from "./navigation/Navigation";

export default function App() {
    return (
        <NativeBaseProvider>
            <RootSiblingParent>
                <Navigation/>
            </RootSiblingParent>
        </NativeBaseProvider>
    )
}
