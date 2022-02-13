import { createSlice } from "@reduxjs/toolkit";

interface ITelaInicial {
    email: string;
    name: string;
    // activeComponentChat: boolean;
    // componentTelaInicial: boolean
}

const initialState: ITelaInicial = {
    email: "",
    name: "",
    // activeComponentChat: false,
    // componentTelaInicial: true
}

const dadosTelaInicial = createSlice({
    name: "changeTelaInicialActions",
    initialState,
    reducers: {
        changeDadosTelaInicialReducer: (state: ITelaInicial, { payload }): ITelaInicial => {
            return state = payload

        },
        logoffChatReducer: (state: ITelaInicial, { payload }): void => {
            state.email = ""
            state.name = ""
            // state.activeComponentChat = false
            // state.componentTelaInicial = true
        },

    }
})

//exporta os reducers para serem usados nos componentes com o dispatch
export const { changeDadosTelaInicialReducer, logoffChatReducer } = dadosTelaInicial.actions

//exporta uma func q pega todo o estado da "Store" e retornna somente o da tela incial
export const selectorTelaInicial = (state: any) => state.telaInicial

//export to store
export default dadosTelaInicial.reducer