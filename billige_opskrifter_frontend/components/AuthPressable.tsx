import React from "react"
import { View, StyleSheet, Text, TouchableOpacity,  } from "react-native"


type AuthPressableProps = {
    text: string,
    color: string,
    onPress: () => void
}

const AuthPressable: React.FC<AuthPressableProps> = ({ text, color, onPress }) => {

    return (
        <View>
            <TouchableOpacity style={[style.btn, {backgroundColor: color}]}
            onPress={onPress}
            >
            <Text style={style.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
   btn:{
    borderRadius: 15,
    textAlign: 'center',
    paddingVertical: 15,
   },
   text:{
    fontWeight: '600',
    color: 'white'
   }
})

export default AuthPressable;