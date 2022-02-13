import React, { memo } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { useSelector } from "react-redux"
import { selectorTelaInicial } from "../../../store/reducers/telaInicial.reducer"




function RenderFlatContentChat({ item }: any): any {
    console.log("Renderizou RenderFlatContentChat")
    let nameTelaInicial: { name: string } = useSelector(selectorTelaInicial)
    let array: any = []
    //se o chat estiver aberto
    if (item.openChat) {
        //faz um map no conteudo das conversar e add na variável
        item.contentChat.map((data: any, index: number) => {
            array.push(
                <View style={[styles.flatContentChatContainer,
                data.author === nameTelaInicial.name ? styles.flatContentChatMySelf : styles.flatContentChatOthers
                ]}>
                    <Text style={styles.flatContentChatMensagem}>{data.content}</Text>
                    <Text style={styles.flatContentChatAuthor}>{data.author}</Text>
                    <Text style={styles.flatContentChatTime}>{data.time}</Text>
                    {data.image &&
                        <Image style={styles.flatContentChatImage} source={require("../../../assets/icons/tabelaIMC.png")} />
                    }
                </View>
            )
        })
    }
    return (
        array
    )
}

const styles = StyleSheet.create({
    flatContentChatContainer: {
        marginBottom: 10,
        borderRadius: 25,
        padding: 12,
        width: 300,
        justifyContent: "flex-end",
    },
    flatContentChatMySelf: {
        backgroundColor: "#ffee58",

    },
    flatContentChatOthers: {
        backgroundColor: "#00f9ff",
        marginLeft: 90
    },
    flatContentChatMensagem: {
        fontSize: 18,
        marginBottom: 10
    },
    flatContentChatAuthor: {
        fontWeight: "bold"
    },
    flatContentChatTime: {
        fontWeight: "bold"
    },
    flatContentChatImage: {
        width: 280,
        height: 190
    }



})

export default memo(RenderFlatContentChat)