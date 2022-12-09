import React from "react"
import { View, StyleSheet, Text } from "react-native"


type HeaderProps = {
    text: string
}

const Header: React.FC<HeaderProps> = ({ text}) => {

    return (
        <View style={{paddingBottom: 10}}>
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

export default Header;