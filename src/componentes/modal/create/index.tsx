import React, { useState } from 'react';
import { Switch, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { useSelector } from "react-redux"

import { selectorSocket } from '../../../store/reducers/socket.reducer';
import { selectorChatContent, IChatContent } from '../../../store/reducers/contentChat.reducer';
import { selectorTelaInicial, ITelaInicial } from '../../../store/reducers/telaInicial.reducer';

export default function ModaCreate({ modalcreate, OpenCloseModaCreate }: any) {
    const [isEnabledRoom, setIsEnabledRoom] = useState(true);
    const [isEnabledPrivate, setIsEnabledPrivate] = useState(false);
    const [isEnabledJoinRoom, setIsEnabledJoinRoome] = useState(false);
    const [typeMessage, setTypeMessage] = useState<string>("")

    const { socket }: any = useSelector(selectorSocket)
    const contentAllChats: IChatContent[] = useSelector(selectorChatContent)
    const dadosTelaInicial: ITelaInicial = useSelector(selectorTelaInicial)


    function ChatCreate() {
        if (typeMessage.length < 1) {
            Alert.alert("Digite um ID ou nome válido")
            return
        }
        //se a solicitação for para criar chat privado
        if (isEnabledPrivate) {
            //checa se ja existe esse chat criado com esse id
            let temp = contentAllChats.find((data: any) => data.chatID === typeMessage)
            //se temp for verdadeiro, já existe esse ID friend add, e o socket se tentar add ele mesmo
            if (temp || typeMessage === socket.id) {
                Alert.alert("Esse nome já existe em sua lista de amigos")
                return
            }
            socket.emit("create_chat_private_server", ({
                id: typeMessage,
                userNameSource: dadosTelaInicial.name
            }))
            OpenCloseModaCreate()
            return
        }
        if (isEnabledJoinRoom) {
            let temp = undefined
            //verifica se já existe algum chat ja add com o ID
            temp = contentAllChats.find((data: any) => data.chatID === typeMessage)
            if (temp) {
                Alert.alert("Já existe esse grupo em seu painel. Favor checar !")
                return
            }
            socket.emit("join_room", (
                {
                    id: typeMessage,
                    userNameSource: dadosTelaInicial.name
                }
            ))
            OpenCloseModaCreate()
            return
        }

        else {
            if (typeMessage.length > 23) {
                Alert.alert("Digite no máximo 23 caracteres")
                return
            }
            //solicitação para criação de chat ROOM
            //checa se ja existe esse chat ROOM criado com esse id
            let temp = contentAllChats.find((state: any) => state.chatID === typeMessage)
            if (temp) {
                Alert.alert("Este CHAT ROOM já existe em sua lista de amigos")
                return
            }
            socket.emit("create_room", ({
                id: socket.id,
                roomName: typeMessage,
                userName: dadosTelaInicial.name
            }))
            OpenCloseModaCreate()
        }
    }


    return (

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalcreate}
        >
            <View style={styles.modalCreateContainer}>
                <View style={styles.modalCreateHeader}>
                    {isEnabledRoom && <Text style={styles.modalCreateHeaderText} > "Criar" sala de chat</Text>}
                    {isEnabledPrivate && <Text style={styles.modalCreateHeaderText} > "Criar" sala privada</Text>}
                    {isEnabledJoinRoom && <Text style={styles.modalCreateHeaderText} > "Juntar-se" a uma sala:</Text>}
                </View>
                <View style={styles.modalCreateButtonSwitchContainer}>
                    <View style={styles.modalCreateButtonSwitchContainerRoom}>
                        <Text style={styles.modalCreateButtonSwitchContainerRoomText}>SALA</Text>
                        <Switch
                            thumbColor={isEnabledRoom ? "#00f689" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setIsEnabledRoom(!isEnabledRoom)
                                setIsEnabledPrivate(false)
                                setIsEnabledJoinRoome(false)
                            }}
                            value={isEnabledRoom}
                        />
                    </View>
                    <View style={styles.modalCreateButtonSwitchContainerPrivate}>
                        <Text style={styles.modalCreateButtonSwitchContainerPrivateText}>PRIVADO</Text>
                        <Switch
                            thumbColor={isEnabledPrivate ? "#00f689" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setIsEnabledPrivate(!isEnabledPrivate)
                                setIsEnabledRoom(false)
                                setIsEnabledJoinRoome(false)
                            }}
                            value={isEnabledPrivate}
                        />
                    </View>
                    <View style={styles.modalCreateButtonSwitchContainerJoinRoom}>
                        <Text style={styles.modalCreateButtonSwitchContainerJoinRoomText}>ENTRAR SALA</Text>
                        <Switch
                            thumbColor={isEnabledJoinRoom ? "#00f689" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setIsEnabledJoinRoome(!isEnabledJoinRoom)
                                setIsEnabledRoom(false)
                                setIsEnabledPrivate(false)

                            }}
                            value={isEnabledJoinRoom}
                        />
                    </View>
                </View>
                <TextInput
                    placeholder={isEnabledRoom ? "Digite um nome para a sala" : "Digite o ID do amigo/sala"}
                    style={styles.viewContainerChatInputMessageType}
                    multiline={false}
                    value={typeMessage}
                    onChangeText={(text: string) => { setTypeMessage(text) }}
                />
                <View>
                    <TouchableOpacity style={styles.modalCreateButton} onPressOut={ChatCreate}>
                        <Text style={styles.modalCreateButtonTextCriar} >{isEnabledJoinRoom ? "ENTRAR" : "CRIAR"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={OpenCloseModaCreate} style={styles.modalCreateButton}>
                        <Text style={styles.modalCreateButtonTextNao}>FECHAR</Text>
                    </TouchableOpacity>
                </View>

            </View >

        </Modal >

    )
}


const styles = StyleSheet.create({
    modalCreateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",

    },
    modalCreateHeader: {
        height: 150,
        marginBottom: 30
    },
    modalCreateButton: {
        marginBottom: 30
    },
    modalCreateHeaderText: {
        fontSize: 50,
        justifyContent: 'center',
        alignItems: "center",
        textAlign: "center",
        alignContent: "center",

    },
    modalCreateButtonTextCriar: {
        fontSize: 30,
        backgroundColor: "#ff0f57",
        padding: 15,
        borderRadius: 30,
        textAlign: "center",
        alignContent: "center",

    },
    modalCreateButtonTextNao: {
        fontSize: 30,
        backgroundColor: "#00f689",
        padding: 15,
        borderRadius: 30
    },
    modalCreateButtonSwitchContainer: {
        flexDirection: "row",

        width: 360,
        justifyContent: "space-between",
        marginBottom: 70
    },
    modalCreateButtonSwitchContainerRoom: {
        alignItems: "center"
    },
    modalCreateButtonSwitchContainerJoinRoom: {

        alignItems: "center"
    },
    modalCreateButtonSwitchContainerPrivate: {
        alignItems: "center"
    },
    modalCreateButtonSwitchContainerRoomText: {
        fontSize: 22,

    },
    modalCreateButtonSwitchContainerJoinRoomText: {
        fontSize: 22
    },
    modalCreateButtonSwitchContainerPrivateText: {
        fontSize: 22,
    },
    viewContainerChatInputMessageType: {
        backgroundColor: "#ede3ed",
        width: 300,
        height: 80,
        borderRadius: 25,
        marginBottom: 40,
        fontSize: 20
    }

})