import React, { useEffect, useState, memo } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, Image, BackHandler, } from 'react-native';

import RenderFlatChatToSelect from './RenderFlatChatToSelect/RenderFlatChatToSelect';
import ModalLogoff from "./modal/logoff/index"
import ModalCreate from "./modal/create/index"
import { useDispatch, useSelector } from "react-redux"
import { selectorTelaInicial } from '../../store/reducers/telaInicial.reducer';
import { selectorSocket } from '../../store/reducers/socket.reducer';
import {
    receiveMessageRoboReducer, addNewChatPrivateReducer, receiveMessagePrivateReducer,
    addNewChatRoomReducer, receiveMessageRoomReducer, IChatContent, selectorChatContent
}
    from '../../store/reducers/contentChat.reducer'


function ChatToSelect({ navigation }: any): JSX.Element {
    console.log("Renderizou ChatToSelect")

    const [modalLogoff, setModalLogoff] = useState<boolean>(false)
    const [modalCreate, setModalCreate] = useState<boolean>(false)


    function OpenCloseModalLogoff() {
        setModalLogoff(!modalLogoff)
    }
    function OpenCloseModaCreate() {
        setModalCreate(!modalCreate)
    }

    const dispatch = useDispatch()
    let telaInicialData = useSelector(selectorTelaInicial)
    let { socket } = useSelector(selectorSocket)
    let chatContent: IChatContent[] = useSelector(selectorChatContent)

    useEffect(() => {
        //não permite voltar com a seta fisica do celular
        BackHandler.addEventListener('hardwareBackPress', function () { return true })


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
                    {/* renderiza o heaer, onde ficam nome user, o ID e os dois modals */}
                    <TouchableOpacity onPressOut={OpenCloseModalLogoff}>
                        <Image style={styles.opçoesLogoffImage} source={require("../../assets/icons/logoff.png")} />
                        {modalLogoff && <ModalLogoff modalLogoff={modalLogoff} OpenCloseModal={OpenCloseModalLogoff} navigation={navigation} />}
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.viewInfoUser} >
                        <Text style={styles.textInfo}> User: </Text>
                        <Text selectable={true} style={{ fontSize: 15 }}>{telaInicialData.name}</Text>
                    </View>
                    <View style={styles.viewInfoUser}>
                        <Text style={styles.textInfo}>ID: </Text>
                        <Text selectable={true} style={{ fontSize: 15 }}>{socket.id}</Text>
                    </View>
                </View>
                <View style={styles.logoff}>
                    <TouchableOpacity onPressOut={OpenCloseModaCreate}>
                        <Image style={styles.opçoesCreateImage} source={require("../../assets/icons/create.png")} />
                        {modalCreate && <ModalCreate modalLogoff={modalCreate} OpenCloseModaCreate={OpenCloseModaCreate} navigation={navigation} />}
                    </TouchableOpacity>
                </View>
            </View>

            {/* renderiza os chats para serem selecionados */}
            <FlatList
                data={chatContent}
                keyExtractor={item => String(item.chatID)}
                renderItem={item => <RenderFlatChatToSelect item={item} navigation={navigation} />}
                scrollEnabled={true}
            />

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
        //flex: 0.15,
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

export default memo(ChatToSelect)