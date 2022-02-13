import { configureStore, combineReducers } from "@reduxjs/toolkit"

import telaInicial from "./reducers/telaInicial.reducer"
import contentChat from "./reducers/contentChat.reducer"
import socket from "./reducers/socket.reducer"

const reducer = combineReducers({
    //importa somente o estado do reducer, não os reducers em si
    telaInicial,
    contentChat,
    socket
})

const store = configureStore({
    reducer,

    // Redux não permite Non-Serializable Data (como promessas, símbolos,
    // mapas / conjuntos, funções ou instâncias de classe no estado de armazenamento
    // Redux ou ações despachadas). para permitir armazenar o socket, que é uma instância
    // cria esse midware abaixo para permitir o armazenamento, permitindo pelo action que é o:
    // socketAction/socketReducer, é o action do socket.reducer

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})
export default store