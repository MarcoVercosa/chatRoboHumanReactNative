import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { activeWindowChat } from "../../../store/reducers/contentChat.reducer"
import ModalDeleteChat from '../modal/delete';
import { useDispatch } from "react-redux"



function RenderFlatChatToSelect({ item, navigation }: any): JSX.Element {
    console.log("Renderizou RenderFlatChatToSelect")

    const [modalDeleteIsVisible, setModalDeleteIsVisible] = useState<boolean>(false)
    const dispatch = useDispatch()

    function OpenChatWindow(chatSelect: string) {
        dispatch(activeWindowChat(chatSelect))
        navigation.navigate("ChatContent")
    }

    function OpenCloseModalDelete() {
        setModalDeleteIsVisible(!modalDeleteIsVisible)
    }

    return (
        <>
            {item.item.isRobo &&
                <TouchableOpacity onPress={() => OpenChatWindow(item.item.chatID)}>
                    <View style={styles.viewChatToSelectRobo}>

                        {item.item.chatNameDestination === "ROBÔ - IMC" &&
                            <Image style={styles.image} source={require("../../../assets/icons/food.png")} />
                        }
                        {item.item.chatNameDestination === "ROBÔ - Reservatórios SP" &&
                            <Image style={styles.image} source={require("../../../assets/icons/water.png")} />
                        }

                        <Text style={styles.viewChatToSelectRoboText}>{item.item.chatNameDestination}</Text>

                    </View>
                </TouchableOpacity>
            }
            {!item.item.isRobo &&
                <ScrollView>
                    <TouchableOpacity
                        onPress={() => OpenChatWindow(item.item.chatID)}
                        onLongPress={OpenCloseModalDelete}
                    >
                        <View style={styles.viewChatToSelectRobo}>

                            {item.item.isRoom &&
                                <Image style={styles.image} source={require("../../../assets/icons/people.png")} />
                            }
                            {!item.item.isRoom &&
                                <Image style={styles.image} source={require("../../../assets/icons/person.png")} />
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
    },
    image: {
        marginLeft: 15,
        height: 80,
        width: 90,
        marginRight: 20
    },
    viewChatToSelectRoboText: {
        fontSize: 18
    }
})

export default memo(RenderFlatChatToSelect)