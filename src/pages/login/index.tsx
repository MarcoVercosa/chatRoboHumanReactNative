
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from "react-redux"
import { selectorSocket } from '../../store/reducers/socket.reducer';
import { changeDadosTelaInicialReducer } from '../../store/reducers/telaInicial.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({ navigation }: any): JSX.Element {
    let { socket }: any = useSelector(selectorSocket)
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const dispatch = useDispatch()

    function Entrar(): void {
        // dispatch(changeDadosTelaInicialReducer({ email: email, name: name }))
        if (name.length > 3 && email.length > 5) {
            //o server irá atrelar o id socket com o username
            socket.emit("join_user_idSocket", ({ userName: name }))
            AsyncStorage.setItem("name", name)
            AsyncStorage.setItem("email", email)

        } else Alert.alert("Preencha os campos para poder entrar")
    }

    useEffect(() => {
        //aqui é o retorno do servidor quando clicar no botao entrar. Será verificado
        //se ja possui algun user com o nome solicitado.
        socket.on("receive_uservalidation_from_server", ({ sucess, message }: { sucess: Boolean, message: string }) => {
            //recebe o ok do server após atrelar o id com o userName e torna true o activeComponentChat
            //com essa prop como true, o component Chat é ativado
            if (sucess === true) {
                ReduxAndRedirect()
            } else {
                Alert.alert(message)
            }
        })

        async function ReduxAndRedirect() {
            dispatch(changeDadosTelaInicialReducer(
                { email: await AsyncStorage.getItem("email"), name: await AsyncStorage.getItem("name") }))
            //redireciona para o componente ChatToSelect
            navigation.navigate("ChatToSelect")
        }

    }, [socket])

    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Image
                    source={require("../../assets/icons/chat.jpg")}
                    style={styles.image}
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="Digite seu email"
                    onChangeText={(text: string) => setEmail(text)}
                    maxLength={25}
                />
                <TextInput
                    style={styles.input}
                    value={name}
                    placeholder="Digite seu nome"
                    onChangeText={(text: string) => setName(text)}
                    maxLength={15}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={Entrar}
                >
                    <Text
                        style={styles.textButton}
                    >Entrar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#08a0ff",

    },
    input: {
        fontSize: 24,
        fontWeight: '600',
        backgroundColor: "white",
        marginBottom: 25,
        width: 300,
        padding: 20,
        borderRadius: 25,
        color: "#514e4e"
    },
    button: {
        backgroundColor: "#f61058",
        padding: 15,
        borderRadius: 25,
    },
    textButton: {
        color: "white",
        textAlign: 'center',
        fontSize: 25,
    },
    image: {
        width: 300,
        height: 250,
        marginBottom: 15,
        borderRadius: 80
    }

});

