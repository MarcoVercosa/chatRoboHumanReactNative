import React, { useState, memo } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, FlatList, } from 'react-native';
import { useDispatch, useSelector } from "react-redux"
import { sendMessageRoboReducer, sendMessagePrivateReducer, sendMessageRoomReducer, selectorChatContent, IChatContent } from '../../store/reducers/contentChat.reducer'
import { selectorTelaInicial } from '../../store/reducers/telaInicial.reducer';
import { selectorSocket } from '../../store/reducers/socket.reducer';
import { RenderFlatContentChatHeader } from "../../componentes/RenderFlatContentChatHeader/index"
import RenderFlatContentChat from '../../componentes/RenderFlatContentChat/index';

function ContentChat(): JSX.Element {
    const [typeMessage, setTypeMessage] = useState<string>("")

    const { socket }: any = useSelector(selectorSocket)
    let nameTelaInicial: { name: string } = useSelector(selectorTelaInicial)
    const contentChatData: Array<IChatContent> = useSelector(selectorChatContent)
    const dispatch = useDispatch()

    function SendMessage() {
        let date = new Date()
        let time = `${date.getHours()}:${date.getMinutes()}`
        //obtem os dados do chat que está aberto
        let findDataChatOpen = contentChatData.filter((data: any): any => data.openChat)

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

                <View style={styles.viewContainerChatHeader}>
                    <FlatList
                        data={contentChatData}
                        keyExtractor={item => String(item.chatID)}
                        //renderItem={({ item }) => <RenderFlatContentChatHeader item={item} />}
                        renderItem={RenderFlatContentChatHeader}
                        removeClippedSubviews={false}//o text dentro dos render do FlatList não ficam selecionados, mesmo conf. Essa prop força a funcionar
                    />
                </View>
                <FlatList
                    data={contentChatData}
                    //keyExtractor={item => String(item.chatID)}
                    keyExtractor={() => Math.random().toFixed(6)}
                    renderItem={({ item }) => <RenderFlatContentChat item={item} />}
                />
                <View style={styles.viewContainerChatMessageType}>
                    <TextInput
                        placeholder='Mensagem'
                        style={styles.viewContainerChatInputMessageType}
                        multiline={true}
                        value={typeMessage}
                        onChangeText={(text: string) => { setTypeMessage(text) }}
                    />
                    <TouchableOpacity style={styles.viewContainerChatMessageButton} onPressOut={SendMessage}
                        disabled={typeMessage.length < 1}
                    >
                        <Image style={styles.viewContainerChatMessageImage} source={require("../../assets/icons/send.jpg")} />
                    </TouchableOpacity>
                </View>

                {/*  evita que  o teclado desconfigure o layout */}
            </View>
            {/* <KeyboardAvoidingView style={{ backgroundColor: "blue" }}
            //behavior={Platform.OS === "ios" ? "padding" : "height"}
            > */}
            {/* <View style={styles.viewContainerChatMessageType}>
                <TextInput
                    placeholder='Mensagem'
                    style={styles.viewContainerChatInputMessageType}
                    multiline={true}
                    value={typeMessage}
                    onChangeText={(text: string) => { setTypeMessage(text) }}
                />
                <TouchableOpacity style={styles.viewContainerChatMessageButton} onPressOut={SendMessage}
                    disabled={typeMessage.length < 1}
                >
                    <Image style={styles.viewContainerChatMessageImage} source={require("../../assets/icons/send.jpg")} />
                </TouchableOpacity>
            </View> */}
            {/* </KeyboardAvoidingView> */}
        </>

    )
}

const styles = StyleSheet.create({
    viewContainerChat: {
        backgroundColor: "#a8d7ff",
        //flex: 1
        height: "100%"
    },
    viewContainerChatHeader: {
        height: "13%",
        backgroundColor: "white",
    },

    viewContainerChatMessageType: {
        flexDirection: "row",
        borderRadius: 25,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        height: "15%",
        backgroundColor: "white",
    },
    viewContainerChatInputMessageType: {
        backgroundColor: "white",
        width: "82%",
        height: "91%",
        marginRight: 5,
        borderRadius: 25,
        fontSize: 25,
        borderWidth: 1,
        borderColor: "grey",
        color: "#514e4e",
        padding: 8
    },
    viewContainerChatMessageButton: {
        //backgroundColor: "white",
        padding: 3,
        borderRadius: 25,
        width: "15%"
    },
    viewContainerChatMessageImage: {
        width: "100%",
        height: 60,
        tintColor: "#08d8ff",
    }

})
export default memo(ContentChat)

