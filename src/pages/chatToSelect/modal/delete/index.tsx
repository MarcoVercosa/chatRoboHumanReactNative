import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux"
import { deleteChatReducer } from '../../../../store/reducers/contentChat.reducer';
import { selectorSocket } from '../../../../store/reducers/socket.reducer';
import { selectorTelaInicial } from '../../../../store/reducers/telaInicial.reducer';


export default function ModalDeleteChat({ data, OpenCloseModalDelete, modalDeleteIsVisible }: any): JSX.Element {
    const dispatch = useDispatch()
    const { socket }: any = useSelector(selectorSocket)
    let telaInicialData = useSelector(selectorTelaInicial)

    function DeleteChat(confirm: boolean) {
        if (confirm) {
            if (data.isRoom) {

                socket.emit("send_message_to_chat_room", {
                    destination: data.chatNameDestination,
                    message: `${telaInicialData.name} deixou a sala`,
                    author: telaInicialData,
                    chatID: data.chatID
                })
                dispatch(deleteChatReducer(data.chatID))
                Alert.alert(`A Sala ${data.chatNameDestination} foi deletado com sucesso`)
                OpenCloseModalDelete()
                return
            }
            if (!data.isRoom) {
                socket.emit("send_message_to_private", {
                    destination: data.chatNameDestination,
                    message: `${telaInicialData.name} deixou a sala PRIVADA`,
                    author: telaInicialData.name,
                    chatID: data.chatID
                })
                dispatch(deleteChatReducer(data.chatID))
                Alert.alert(`O Chat privado ${data.chatNameDestination} foi deletado com sucesso`)
                OpenCloseModalDelete()
                return
            }

        } else {
            OpenCloseModalDelete()
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalDeleteIsVisible}
        >
            <View style={styles.modalDeleteContainer}>
                <View style={styles.modalDeleteViewMensagem} >
                    <Text style={styles.modalDeleteViewMensagemText}>Deletar o chat "{data.chatNameDestination}" ?</Text>
                </View>
                <View style={styles.modalDeleteViewButtons} >
                    <TouchableOpacity style={styles.modalDeleteButtonSim} onPressOut={() => DeleteChat(true)}>
                        <Text style={styles.modalDeleteButtonTextSim} >SIM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => DeleteChat(false)} style={styles.modalDeleteButtonNao}>
                        <Text style={styles.modalDeleteButtonTextNao}>CANCELAR</Text>
                    </TouchableOpacity>
                </View>
            </View >

        </Modal >

    )
}

const styles = StyleSheet.create({

    modalDeleteContainer: {
        flex: 1,
        flexDirection: "column",

    },
    modalDeleteViewMensagem: {
        flex: 0.20,
        justifyContent: "center",
        alignItems: "center",
    },
    modalDeleteViewMensagemText: {
        fontSize: 28
    },
    modalDeleteViewButtons: {
        flex: 0.80,
        justifyContent: 'center',
        alignItems: "center",
    },
    modalDeleteButtonSim: {


    },
    modalDeleteButtonNao: {

    },
    modalDeleteButtonTextSim: {
        fontSize: 30,
        backgroundColor: "#ff0f57",
        padding: 15,
        borderRadius: 30,
        textAlign: "center",
        alignContent: "center",
        width: 180
    },
    modalDeleteButtonTextNao: {
        fontSize: 30,
        backgroundColor: "#00f689",
        padding: 15,
        borderRadius: 30,
        textAlign: "center",
        alignContent: "center",
        marginTop: 30
    }
})