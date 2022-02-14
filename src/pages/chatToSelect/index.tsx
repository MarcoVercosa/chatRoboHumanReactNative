import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from "react-redux"
import { selectorTelaInicial } from '../../store/reducers/telaInicial.reducer';
import { selectorSocket } from '../../store/reducers/socket.reducer';
import RenderFlatChatToSelect from './RenderFlatChatToSelect/RenderFlatChatToSelect';
import ModalLogoff from "./modal/logoff/index"
import ModalCreate from "./modal/create/index"
import {
    receiveMessageRoboReducer, addNewChatPrivateReducer, receiveMessagePrivateReducer,
    addNewChatRoomReducer, receiveMessageRoomReducer, IChatContent, selectorChatContent
}
    from '../../store/reducers/contentChat.reducer'


export default function ChatToSelect({ navigation }: any): JSX.Element {
    console.log("Renderizou ChatToSelect")

    const [modalLogoff, setModalLogoff] = useState<boolean>(false)
    const [modalCreate, setModalCreate] = useState<boolean>(false)

    function OpenCloseModalLogoff() {
        setModalLogoff(false)
    }
    function OpenCloseModaCreate() {
        setModalCreate(false)
    }

    const dispatch = useDispatch()
    let telaInicialData = useSelector(selectorTelaInicial)
    let { socket } = useSelector(selectorSocket)
    let chatContent: IChatContent[] = useSelector(selectorChatContent)

    useEffect(() => {
        //recebe do servidor dados (se sucesso) para criar conversa privada. O client inicia o ciclo
        //poder ser por solicicitação da outra ponta, pois o amigo ao add, a outra ponta recebe a solicitação para criar o chat
        socket.on("create_chat_private_client", ({ sucess, message, userName, id, time }: any) => {
            if (sucess) {
                dispatch(addNewChatPrivateReducer({ sucess, userName, id, time }))
                Alert.alert(`Iniciado uma conversa com ${userName}. Check o painel a esquerda`)
            } else {
                Alert.alert(message)
            }
        })

        //recebe mensagem robo 
        socket.on("received_message_from_robo", ({ content, author, time, image, isCharts }: any) => {
            console.log("Mensagem recebida do ROBO")
            dispatch(receiveMessageRoboReducer({ content, author, time, image, isCharts }))
        })
        //recebe mensagem privada
        socket.on("received_message_private", ({ content, author, time, idDestiny, idSource }: any) => {
            dispatch(receiveMessagePrivateReducer({ content, author, time, idDestiny, idSource }))
        })

        //usado pelo server quando solciita criação de uma sala
        //recebe do servidor quando o solicitante cria um room Chat
        socket.on("confirm_create_room", ({ sucess, roomName, id, message, userName, time }: any) => {
            if (sucess) {
                dispatch(addNewChatRoomReducer({ roomName, id, message, userName, time }))
                Alert.alert("O usuário " + userName + " adicionou uma CHAT ROOM chamada " + roomName)
                return
            }
            Alert.alert(message)
        })
        //recebe se o cliente solicitar ingressar em um chatRoom
        //poder ser por solicitação da origem ao criar uma sala privada, ou do destino
        socket.on("add_chat_room", ({ sucess, roomName, id, message, userName, time }: any) => {
            if (sucess) {
                dispatch(addNewChatRoomReducer({ roomName, id, message, userName, time }))
                Alert.alert("O usuário " + userName + " adicionou uma CHAT ROOM chamada " + roomName)
                return
            }
            Alert.alert(message)
        })

        socket.on("received_message_room", ({ destination, message, author, chatID }: any) => {
            console.log("recebeu mensagem de SALA")
            dispatch(receiveMessageRoomReducer({ destination, message, author, chatID }))
        })

    }, [socket])


    return (
        <View style={styles.container}>


            <View style={styles.viewInfoUserContainer}>
                <View style={styles.opçoes}>
                    <TouchableOpacity onPressOut={() => setModalLogoff(true)}>
                        <Image style={styles.opçoesLogoffImage} source={require("../../assets/icons/logoff.png")} />
                        {modalLogoff && <ModalLogoff modalLogoff={modalLogoff} OpenCloseModal={OpenCloseModalLogoff} navigation={navigation} />}
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.viewInfoUser} >
                        <Text style={styles.textInfo}> User: </Text>
                        <Text style={{ fontSize: 15 }}>{telaInicialData.name}</Text>
                    </View>
                    <View style={styles.viewInfoUser}>
                        <Text style={styles.textInfo}>ID: </Text>
                        <Text style={{ fontSize: 15 }}>{socket.id}</Text>
                    </View>
                </View>
                <View style={styles.logoff}>
                    <TouchableOpacity onPressOut={() => setModalCreate(true)}>
                        <Image style={styles.opçoesCreateImage} source={require("../../assets/icons/create.png")} />
                        {modalCreate && <ModalCreate modalLogoff={modalCreate} OpenCloseModaCreate={OpenCloseModaCreate} navigation={navigation} />}
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <FlatList
                    data={chatContent}
                    keyExtractor={item => String(item.chatID)}
                    renderItem={item => <RenderFlatChatToSelect item={item} navigation={navigation} />}
                />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e2e2e2"
    },
    viewInfoUserContainer: {
        backgroundColor: "white",
        flex: 0.15,
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: 'center',
        textAlign: "center",
        alignItems: "center",
        marginBottom: 10

    },
    viewInfoUser: {
        flexDirection: 'row',
        padding: 7,
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",

    },
    textInfo: {
        fontSize: 20,
        fontWeight: "bold",
    },
    opçoes: {

    },
    logoff: {

    },
    opçoesLogoffImage: {
        width: 40,
        height: 40,
    },
    opçoesCreateImage: {
        width: 60,
        height: 50,
        tintColor: "#767872",
    }

})