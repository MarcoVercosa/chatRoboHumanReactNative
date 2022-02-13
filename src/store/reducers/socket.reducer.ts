import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client"


// const socketInitialState = undefined
const initialState = {

    // socket: io("https://chat.mavs.vps-kinghost.net")
    // socket: io("https://192.168.15.143:8889/")

    socket: io("https://powerful-tor-26335.herokuapp.com")
}

const socket = createSlice({
    name: "socketAction",
    initialState,
    reducers: {
        socketReducer: (state: any, { payload }: any): any => {
            return state = payload
        },
        socketReconnectReducer: (state: any, { payload }: any): any => {

            state.socket = io("https://powerful-tor-26335.herokuapp.com")
        },
    }
})

//exporta os reducers para serem usados nos componentes com o dispatch
export const { socketReducer, socketReconnectReducer } = socket.actions

//exporta uma func q pega todo o estado da "Store" e retornna somente o do socket
export const selectorSocket = (state: any) => state.socket

//export to store
export default socket.reducer