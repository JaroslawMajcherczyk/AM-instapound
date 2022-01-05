import React from 'react'
import {StyleSheet, Linking} from 'react-native'
import {Box, Button, Center, Divider, Flex, Heading, VStack} from "native-base";
import ApiCalls from "../utils/ApiCalls";


const AppInformationScreen = () => {
    return (
        <VStack style={{flex: 1, marginVertical: "20%", justifyContent: "space-between"}}>
            <Center>
                <Box w="90%" bg={"white"} rounded={"xl"} padding={2} shadow={9}>
                    <Heading mx="auto">Application Version</Heading>
                    <Divider my="2" />
                    <Heading mx="auto">v1.0</Heading>
                </Box>
            </Center>

            <Center>
                <Box w="90%" bg={"white"} rounded={"xl"} padding={2} shadow={9}>
                    <Heading mx="auto">Authors</Heading>
                    <Divider my="2" />
                    <Flex mx="3" direction="row" justify="space-evenly">
                        <Heading py="2" fontSize={12}>Eryk Ngo Ngoc</Heading>
                        <Divider orientation="vertical" mx="3" />
                        <Heading py="2" fontSize={12}>Jarosław Majcherczyk</Heading>
                        <Divider orientation="vertical" mx="3" />
                        <Heading py="2" fontSize={12}>Hubert Oszywa</Heading>
                    </Flex>
                    <Divider my="2" />
                    <Heading mx="auto">3IZ12A</Heading>
                </Box>
            </Center>

            <Center>
                <Box w="90%" bg={"white"} rounded={"xl"} padding={2} shadow={9}>
                    <Heading mx="auto">OpenApi documentation</Heading>
                    <Divider my="2" />
                    <Button onPress={() => Linking.openURL(ApiCalls.API_DOC_URL)}>Visit the interactive API documentation</Button>
                </Box>
            </Center>
        </VStack>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    }
})


export default AppInformationScreen
