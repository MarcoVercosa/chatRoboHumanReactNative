import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function RenderFlatContentChat({ item }: any): any {
    let array: any = []
    //se o chat estiver aberto
    if (item.openChat) {
        console.log(item)
        //faz um map no conteudo das conversar e add na variável
        item.contentChat.map((data: any, index: number) => {
            array.push(
                <>
                    <Text>{data.content}</Text>
                    <Text>{data.author}</Text>
                    <Text>{data.time}</Text>
                </>
            )
        })
    }
    return (
        array
    )
}

const styles = StyleSheet.create({


})

export { RenderFlatContentChat }