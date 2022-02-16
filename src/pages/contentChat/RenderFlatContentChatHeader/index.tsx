import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IChatContent } from "../../../store/reducers/contentChat.reducer"

function RenderFlatContentChatHeader({ item }: { item: IChatContent }): JSX.Element {
    return (
        <>
            {item.openChat &&
                <View style={styles.viewContainerChatHeader}>
                    <Text selectable={true} style={styles.viewContainerChatHeaderTextName}>{item.chatNameDestination}</Text>
                    <Text selectable={true} style={styles.viewContainerChatHeaderTextId}>ID: {item.chatID}</Text>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    viewContainerChatHeader: {
        backgroundColor: "white",
        height: 95,

        alignItems: "center",
    },
    viewContainerChatHeaderTextName: {
        fontSize: 30,
        textAlign: "center",
        alignContent: "center",

    },
    viewContainerChatHeaderTextId: {
        fontSize: 18,
        textAlign: "center",
        alignContent: "center",
    }
})

export { RenderFlatContentChatHeader }
