export interface IsendMessageRoboReducer {
    payload: {
        message: string;
        author: string;
        time: string;
        destination: string
        socketDestinatioString: string
    }
}
export interface IreceiveMessageRoboReducer {
    payload: {
        content: string;
        author: string;
        time: string;
        image?: string
        isCharts?: Array<{
            currentDate: string
            reservatorios: string
            total: string;
            infoGrafico: string
        }>
    }
}
export interface IactiveWindowChat {
    payload: {
        chatID: string
    }
}

export interface IreceiveMessagePrivateReducer {
    payload: {
        content: string;
        author: string;
        time: string;
        idDestiny: string
        idSource: string
    }
}
export interface IsendMessagePrivateReducer {
    payload: {
        chatID: string;
        message: string;
        author: string
    }
}

export interface IsendMessageRoomReducer {
    payload: {
        message: string;
        author: string;
        chatID: string
        destination: string
    }
}

export interface IreceiveMessageRoomReducer {
    payload: {
        destination: string;
        message: string;
        author: string;
        chatID: string
    }
}

export interface IaddNewChatPrivateReducer {
    payload: {
        userName: string;
        id: string;
        time: string;
        sucess?: boolean
    }
}
export interface IaddNewChatRoomReducer {
    payload: {
        roomName: string;
        id: string;
        message: string;
        userName: string;
        time: string
    }
}
export interface IdeleteChatReducer {
    payload: {
        chatID: string
    }
}