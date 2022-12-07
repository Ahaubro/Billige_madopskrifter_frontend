import React from "react"
import { View, StyleSheet, Text } from "react-native"


type HeaderWithoutBackcontainerProps = {
    text: string
}

const HeaderWithoutBackcontainer: React.FC<HeaderWithoutBackcontainerProps> = ({ text}) => {

    return (
        <View style={{paddingTop: 62}}>
            <Text style={style.header}>{text}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '700',
    }
})

export default HeaderWithoutBackcontainer;