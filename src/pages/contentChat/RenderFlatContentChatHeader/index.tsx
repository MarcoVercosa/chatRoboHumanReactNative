import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function RenderFlatContentChatHeader({ item }: any): any {
    return (
        <>
            {item.openChat &&
                <View style={styles.viewContainerChatHeader}>
                    <Text style={{ fontSize: 30 }}>{item.chatNameDestination}</Text>
                    <Text style={{ fontSize: 18 }}>ID: {item.chatID}</Text>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    viewContainerChatHeader: {
        backgroundColor: "white",
        height: 70,
        justifyContent: "center",
        alignItems: "center",
    },
})

export { RenderFlatContentChatHeader }