import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, } from 'react-native';

import { activeWindowChat, IChatContent } from "../../store/reducers/contentChat.reducer"
import ModalDeleteChat from '../modal/delete';
import { useDispatch } from "react-redux"

interface IItem {
    item: {
        item: IChatContent,
    },
    navigation: any
}


function RenderFlatChatToSelect({ item, navigation }: IItem): JSX.Element {

    const [modalDeleteIsVisible, setModalDeleteIsVisible] = useState<boolean>(false)
    const dispatch = useDispatch()

    function OpenChatWindow(chatSelect: string): void {
        dispatch(activeWindowChat({ chatID: chatSelect }))
        navigation.navigate("ChatContent")
    }

    function OpenCloseModalDelete(): void {
        setModalDeleteIsVisible(!modalDeleteIsVisible)
    }

    return (
        <>
            {item.item.isRobo &&
                <TouchableOpacity onPress={() => OpenChatWindow(String(item.item.chatID))}>
                    <View style={styles.viewChatToSelectRobo}>

                        {item.item.chatNameDestination === "ROBÔ - IMC" &&
                            <Image style={styles.image} source={require("../../assets/icons/food.jpg")} />
                        }
                        {item.item.chatNameDestination === "ROBÔ - Reservatórios SP" &&
                            <Image style={styles.image} source={require("../../assets/icons/water.jpg")} />
                        }

                        <Text style={styles.viewChatToSelectRoboText}>{item.item.chatNameDestination}</Text>
                    </View>
                </TouchableOpacity>
            }
            {!item.item.isRobo &&
                <ScrollView>
                    <TouchableOpacity
                        onPress={() => OpenChatWindow(String(item.item.chatID))}
                        onLongPress={() => OpenCloseModalDelete()}
                    >
                        <View style={styles.viewChatToSelectRobo}>

                            {item.item.isRoom &&
                                <Image style={styles.image} source={require("../../assets/icons/people.jpg")} />
                            }
                            {!item.item.isRoom &&
                                <Image style={styles.image} source={require("../../assets/icons/person.jpg")} />
                            }
                            <Text style={styles.viewChatToSelectRoboText}>{item.item.chatNameDestination}</Text>

                        </View>
                    </TouchableOpacity>
                </ScrollView>
            }

            <ModalDeleteChat data={item.item} OpenCloseModalDelete={OpenCloseModalDelete} modalDeleteIsVisible={modalDeleteIsVisible} />
        </>
    )
}

const styles = StyleSheet.create({
    viewChatToSelectRobo: {
        backgroundColor: "white",
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        width: "100%"

    },
    image: {
        marginLeft: "1.5%",
        height: 80,
        width: 90,
        marginRight: "2%"
    },
    viewChatToSelectRoboText: {
        fontSize: 18,
    }
})

export default memo(RenderFlatChatToSelect)