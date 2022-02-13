import { createSlice } from "@reduxjs/toolkit";

import {
    IsendMessageRoboReducer, IreceiveMessagePrivateReducer, IsendMessageRoomReducer,
    IreceiveMessageRoboReducer, IactiveWindowChat, IaddNewChatPrivateReducer,
    IsendMessagePrivateReducer, IaddNewChatRoomReducer, IreceiveMessageRoomReducer,
    IdeleteChatReducer,
} from "./contentChat.reducer.interface"

export interface IChatContent {
    openChat: boolean;
    chatNameDestination: string;
    isRoom: boolean;
    socketDestination: string;
    isRobo: boolean
    isPrivate: boolean
    chatID: number | undefined;
    contentChat: Array<{
        content: string,
        author: string,
        time: any
    }>;
}

let time = new Date()
const initialState: IChatContent[] =
    [
        {
            openChat: true,
            chatNameDestination: "ROBÔ - IMC",
            isRoom: false,
            socketDestination: "send_message_to_robo_imc",
            isRobo: true,
            isPrivate: false,
            chatID: 1,
            contentChat: [{
                content: "Olá, tudo bem ? Sou o Robô- IMC. Posso lhe ajudar com seu IMC (Índice de Massa Corporal) ?",
                author: "ROBÔ - IMC",
                time: ""
            }, {
                content: "Por favor, digite sim para lhe ajudar ou não para encerrar:",
                author: "ROBÔ - IMC",
                time: ""
            }]
        },
        {
            openChat: false,
            chatNameDestination: "ROBÔ - Reservatórios SP",
            // avatar: "fas fa-3x fa-hand-holding-water",
            // color: "rgb(79, 135, 255)",
            chatID: 2,
            isRoom: false,
            isPrivate: false,
            socketDestination: "send_message_to_robo_reservatorios_sp",
            isRobo: true,
            contentChat: [{
                content: "Olá, tudo bem ? Sou o ROBÔ - Reservatórios SP. Digite sim para saber como está a situação dos nossos reservatórios ou digite não para cancelar",
                author: "ROBÔ - Reservatórios SP",
                time: ""
            }],
        }
    ]

const contentChat = createSlice({
    name: "chatContentAction",
    initialState,
    reducers: {

        //recebe mensagens enviadas pelo "client" e armazena
        receiveMessageRoboReducer(state: any, { payload }: IreceiveMessageRoboReducer): any {
            state.map((data: any, index: any) => {
                if (payload.author === data.chatNameDestination) {
                    data.contentChat = [...data.contentChat, payload]
                }
            })
            // return state
        },
        //recebe mensagens automáticas do "server" e as armazena
        sendMessageRoboReducer(state: any, { payload }: IsendMessageRoboReducer): any {
            state.map((data: any, index: number) => {
                if (payload.destination === data.chatNameDestination) {
                    data.contentChat = [...data.contentChat, { content: payload.message, author: payload.author, time: payload.time }]
                }
            })
        },
        //altera a array de conversa para true e assim renderizar a janela de conversa
        activeWindowChat(state: any, { payload }: IactiveWindowChat): any {
            //recebe o nome do chat selecionado e deixa o respectivo obj do chat como True
            state.map((data: any, index: number) => {
                if (data.chatID === payload) {
                    data.openChat = true
                } else {
                    data.openChat = false
                }
            })
            return state
        },
        //cria uma nova janela para conversa particular
        addNewChatPrivateReducer(state: any, { payload }: IaddNewChatPrivateReducer): any {
            state = [...state, {
                openChat: false,
                chatNameDestination: payload.userName,
                chatID: payload.id,
                isRoom: false,
                socketDestination: "send_message_to_private",
                isRobo: false,
                isPrivate: true,
                contentChat: [{
                    content: `${payload.userName} iniciou conversa com você`,
                    author: payload.userName,
                    time: payload.time
                }]
            }]
            return state
        },
        //recebe mensagens enviadas pelo "client" e armazena
        sendMessagePrivateReducer(state: any, { payload }: IsendMessagePrivateReducer): any {
            state.map((data: any, index: any) => {
                if (payload.chatID === data.chatID) {
                    data.contentChat = [...data.contentChat, { content: payload.message, author: payload.author, time: `${time.getHours()}:${time.getMinutes()}` }]
                }
            })

        },
        //recebe mensagens privadas do "server" e as armazena
        receiveMessagePrivateReducer(state: any, { payload }: IreceiveMessagePrivateReducer): any {
            state.map((data: any, index: any) => {
                if (payload.idSource === data.chatID) {
                    data.contentChat = [...data.contentChat, { content: payload.content, author: payload.author, time: payload.time }]
                }
            })
        },
        //add uma nova roomChat para criar ou add já existente no server
        addNewChatRoomReducer(state: any, { payload }: IaddNewChatRoomReducer): any {
            state = [...state, {
                openChat: false,
                chatNameDestination: payload.roomName,
                chatID: payload.id,
                isRoom: true,
                socketDestination: "send_message_to_chat_room",
                isRobo: false,
                isPrivate: false,
                contentChat: [{
                    content: payload.message,
                    author: payload.userName,
                    time: payload.time
                }]
            }]
            return state
        },
        sendMessageRoomReducer(state: any, { payload }: IsendMessageRoomReducer): any {
            state.map((data: any, index: any) => {
                if (payload.chatID === data.chatID) {
                    data.contentChat = [...data.contentChat, { content: payload.message, author: payload.author, time: `${time.getHours()}:${time.getMinutes()}` }]
                }
            })

        },
        receiveMessageRoomReducer(state: any, { payload }: IreceiveMessageRoomReducer): any {
            state.map((data: any, index: any) => {
                if (payload.chatID === data.chatID) {
                    data.contentChat = [...data.contentChat, { content: payload.message, author: payload.author, time: `${time.getHours()}:${time.getMinutes()}` }]
                }
            })

        },
        deleteChatReducer(state: any, { payload }: IdeleteChatReducer) {
            let temp = state.filter((data: any) => data.chatID !== payload)
            return state = temp
        },
        initialStateReconnect(state: any, { payload }: any) {
            return state = initialState
        }
    }
})

//exporta os reducers para serem usados nos componentes com o dispatch
export const { receiveMessageRoboReducer, sendMessageRoboReducer,
    addNewChatPrivateReducer, sendMessagePrivateReducer,
    activeWindowChat, receiveMessagePrivateReducer,
    addNewChatRoomReducer, sendMessageRoomReducer, receiveMessageRoomReducer,
    deleteChatReducer, initialStateReconnect
} = contentChat.actions

//exporta uma func q pega todo o estado da "Store" e retorna somente o do chatContent
export const selectorChatContent = (state: any) => state.contentChat

//export to store
export default contentChat.reducer