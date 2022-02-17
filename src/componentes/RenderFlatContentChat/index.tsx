import React, { memo } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useSelector } from "react-redux"
import { selectorTelaInicial } from "../../store/reducers/telaInicial.reducer"
import Charts from '../charts';

interface IChatContentMap {
    content: string;
    author: string;
    time: any;
    image: string;
    isCharts: []
}

function RenderFlatContentChat({ item }: any): JSX.Element {
    let nameTelaInicial: { name: string } = useSelector(selectorTelaInicial)
    let array: any = []
    //se o chat estiver aberto
    if (item.openChat) {
        //faz um map no conteudo das conversar e add na variável
        item.contentChat.map((data: IChatContentMap) => {
            array.push(
                <View style={[styles.flatContentChatContainer,
                data.author === nameTelaInicial.name ? styles.flatContentChatMySelf : styles.flatContentChatOthers
                ]}>
                    <Text style={styles.flatContentChatMensagem}>{data.content}</Text>
                    <Text style={styles.flatContentChatAuthor}>{data.author}</Text>
                    <Text style={styles.flatContentChatTime}>{data.time}</Text>
                    {data.image &&
                        <Image style={styles.flatContentChatImage} source={require("../../assets/icons/tabelaIMC.jpg")} />
                    }
                    {data.isCharts &&
                        <Charts data={data.isCharts} />
                    }
                </View>
            )
        })
    }
    return (
        <>
            {array}
        </>
    )
}

const styles = StyleSheet.create({
    flatContentChatContainer: {
        marginBottom: 10,
        borderRadius: 25,
        padding: 12,
        // width: 320,
        width: "82%",
        justifyContent: "flex-end",
    },
    flatContentChatMySelf: {
        backgroundColor: "#ffee58",
        marginLeft: "2%",

    },
    flatContentChatOthers: {
        backgroundColor: "#00f9ff",
        marginLeft: 60
    },
    flatContentChatMensagem: {
        fontSize: 20,
        marginBottom: 10,
        color: "#514e4e"
    },
    flatContentChatAuthor: {
        fontWeight: "bold",
        color: "#514e4e"
    },
    flatContentChatTime: {
        fontWeight: "bold",
        color: "#514e4e"
    },
    flatContentChatImage: {
        width: 280,
        height: 190
    }
})

export default memo(RenderFlatContentChat)