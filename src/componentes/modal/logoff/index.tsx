import React from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux"
import { logoffChatReducer } from '../../../store/reducers/telaInicial.reducer'
import { selectorSocket, socketReconnectReducer } from '../../../store/reducers/socket.reducer';
import { initialStateReconnect } from '../../../store/reducers/contentChat.reducer';

interface IModalLogoff {
    modalLogoff: boolean;
    OpenCloseModal: () => void;
    navigation: any
}

export default function ModalLogoff({ modalLogoff, OpenCloseModal, navigation }: IModalLogoff) {
    const dispatch = useDispatch()
    const { socket }: any = useSelector(selectorSocket)

    function Logoff() {
        //altera o estado para renderizar a tela inicial
        dispatch(logoffChatReducer(true))
        //retorna os chat ao estado de inicialização no Redux
        dispatch(initialStateReconnect(true))
        //desloga a conexão com o socket server
        socket.disconnect();
        //reconecta novamente
        dispatch(socketReconnectReducer(true))

        navigation.navigate("LOGIN")
        OpenCloseModal()
    }

    return (

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalLogoff}
            style={styles.modalLogoffContainer}
        >
            <View style={styles.modalLogoffContainer}>
                <View style={styles.modalLogoffHeader}>
                    <Text style={styles.modalLogoffHeaderText} > Deslogar ?</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.modalLogoffButton} onPressOut={Logoff}>
                        <Text style={styles.modalLogoffButtonTextSim} >SIM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={OpenCloseModal} style={styles.modalLogoffButton}>
                        <Text style={styles.modalLogoffButtonTextNao}>NÃO</Text>
                    </TouchableOpacity>
                </View>
            </View >

        </Modal >

    )
}


const styles = StyleSheet.create({
    modalLogoffContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    modalLogoffHeader: {
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
    },
    modalLogoffButton: {
        marginBottom: 30
    },
    modalLogoffHeaderText: {
        fontSize: 50,

    },
    modalLogoffButtonTextSim: {
        fontSize: 30,
        backgroundColor: "#ff0f57",
        padding: 15,
        borderRadius: 30

    },
    modalLogoffButtonTextNao: {
        fontSize: 30,
        backgroundColor: "#00f689",
        padding: 15,
        borderRadius: 30
    }



})