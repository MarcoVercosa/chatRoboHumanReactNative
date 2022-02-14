import React, { useState, memo } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, Alert, FlatList, TouchableWithoutFeedbackComponent } from 'react-native';
import { useDispatch, useSelector } from "react-redux"
import { sendMessageRoboReducer, sendMessagePrivateReducer, sendMessageRoomReducer, selectorChatContent, IChatContent } from '../../store/reducers/contentChat.reducer'
import { selectorTelaInicial } from '../../store/reducers/telaInicial.reducer';
import { selectorSocket } from '../../store/reducers/socket.reducer';
import { RenderFlatContentChatHeader } from "./RenderFlatContentChatHeader/index"
import RenderFlatContentChat from './RenderFlatContentChat';

export default function ContentChat(): JSX.Element {
    console.log("Renderizou ContentChat")
    const [typeMessage, setTypeMessage] = useState<string>("")

    const { socket }: any = useSelector(selectorSocket)
    let nameTelaInicial: { name: string } = useSelector(selectorTelaInicial)
    const contentChatData: Array<IChatContent> = useSelector(selectorChatContent)
    const dispatch = useDispatch()

    function SendMessage() {
        let date = new Date()
        let time = `${date.getHours()}:${date.getMinutes()}`

        //obtem os dados do chat que está aberto
        let findDataChatOpen = contentChatData.filter((data: IChatContent) => data.openChat)

        Send({
            message: typeMessage,
            author: nameTelaInicial.name,
            isRobo: findDataChatOpen[0].isRobo,
            isRoom: findDataChatOpen[0].isRoom,
            isPrivate: findDataChatOpen[0].isPrivate,
            destination: findDataChatOpen[0].chatNameDestination,
            socketDestinatioString: findDataChatOpen[0].socketDestination,
            chatID: String(findDataChatOpen[0].chatID),
            time: time
        }
        )

        function Send({ message, author, destination, socketDestinatioString, chatID, isRobo, isRoom, isPrivate }: any) {

            // oq for true, será o tipo de conversa que quer mandar mensagem
            if (isRobo) {
                dispatch(sendMessageRoboReducer({ message, author, destination, socketDestinatioString, time }))
            }
            if (isPrivate) {
                dispatch(sendMessagePrivateReducer({ message, author, chatID }))
            }
            if (isRoom) {
                dispatch(sendMessageRoomReducer({ message, author, destination, chatID }))
            }
            //todo evento de botão irá passar socketDestinatioString, que é o socket destino do servidor q será chamado
            socket.emit(socketDestinatioString, { message, author, time, chatID, destination })
            setTypeMessage("")
        }
        setTypeMessage("")
    }

    return (
        <>
            <View style={styles.viewContainerChat}>

                <FlatList
                    data={contentChatData}
                    keyExtractor={item => String(item.chatID)}
                    renderItem={({ item }) => <RenderFlatContentChatHeader item={item} />}
                />
                <FlatList
                    data={contentChatData}
                    keyExtractor={item => String(item.chatID)}
                    renderItem={({ item }) => <RenderFlatContentChat item={item} />}
                />

            </View>

            <View style={styles.viewContainerChatMessageType}>
                <TextInput
                    placeholder='Mensagem'
                    style={styles.viewContainerChatInputMessageType}
                    multiline={true}
                    value={typeMessage}
                    onChangeText={(text: string) => { setTypeMessage(text) }}
                />
                <TouchableOpacity style={styles.viewContainerChatMessageButton} onPressOut={SendMessage}>
                    <Image style={styles.viewContainerChatMessageImage} source={require("../../assets/icons/send.png")} />
                </TouchableOpacity>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    viewContainerChat: {
        backgroundColor: "#a8d7ff",
        flex: 0.92
    },

    viewContainerChatMessageType: {
        flex: 0.13,
        flexDirection: "row",
        // backgroundColor: "red",
        borderRadius: 25,
        width: 400,
        justifyContent: "center",
        alignItems: "center",
    },
    viewContainerChatInputMessageType: {
        backgroundColor: "#c9c3cb",
        width: 325,
        height: 90,
        marginRight: 5,
        borderRadius: 25,
        fontSize: 25

    },
    viewContainerChatMessageButton: {
        backgroundColor: "#a8d7ff",
        padding: 3,
        borderRadius: 25,
        width: 55
    },
    viewContainerChatMessageImage: {
        width: 60,
        height: 60,
        tintColor: "white",
    }

})

