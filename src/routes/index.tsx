import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from '../store/store';

import Login from "../pages/login/index"
import ChatToSelect from "../pages/chatToSelect/index"
import RenderFlatContentChat from "../pages/contentChat/index"



export default function Routes(): JSX.Element {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Provider store={store}>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="ChatToSelect" component={ChatToSelect} />
                    <Stack.Screen name="ChatContent" component={RenderFlatContentChat} />
                </Stack.Navigator>
            </Provider>
        </NavigationContainer>
    )
}