import * as React from 'react';
import { View, Text, Button, Alert } from 'react-native';
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

                    <Stack.Screen name="LOGIN" component={Login}
                        options={{
                            title: 'LOGIN',
                            headerStyle: {
                                backgroundColor: "#08a0ff",
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTitleAlign: "center"
                        }}
                    />
                    <Stack.Screen name="ChatToSelect" component={ChatToSelect}
                        options={{
                            title: 'HOME',
                            headerStyle: {
                                backgroundColor: "#08a0ff",
                            },
                            headerBackVisible: false, //desabilita a seta de voltar, para evitar ir para a tela de login
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTitleAlign: "center"
                        }}
                    />
                    <Stack.Screen name="ChatContent" component={RenderFlatContentChat}
                        options={{
                            title: 'CONVERSA',
                            headerStyle: {
                                backgroundColor: '#08a0ff',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTitleAlign: "center",

                        }}
                    />
                </Stack.Navigator>
            </Provider>
        </NavigationContainer>
    )
}