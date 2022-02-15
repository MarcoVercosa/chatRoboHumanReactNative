import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function RenderFlatContentChatHeader({ item }: any): any {
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
