import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IChatContent } from "../../store/reducers/contentChat.reducer"

function RenderFlatContentChatHeader({ item }: { item: IChatContent }): JSX.Element {
    return (
        <>
            {item.openChat &&
                <>
                    {/* <View style={styles.viewContainerChatHeader}> */}
                    <Text selectable={true} style={styles.viewContainerChatHeaderTextName}>{item.chatNameDestination}</Text>
                    <Text selectable={true} style={styles.viewContainerChatHeaderTextId}>ID: {item.chatID}</Text>
                    {/* </View> */}
                </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    viewContainerChatHeaderTextName: {
        marginTop: "1%",
        fontSize: 22,
        textAlign: "center",
        alignContent: "center",
        color: "#514e4e",
    },
    viewContainerChatHeaderTextId: {
        fontSize: 18,
        textAlign: "center",
        alignContent: "center",
        color: "#514e4e",
        marginTop: "1%",
    }
})

export { RenderFlatContentChatHeader }
