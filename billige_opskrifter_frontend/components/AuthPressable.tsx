import React from "react" // Import af React til brug af FC - functionComponent
import { View, StyleSheet, Text, TouchableOpacity,  } from "react-native" // Import af react native komponenter


// Props til denne komponent inkludere tekst, farve og onPress funktion
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
    paddingVertical: 20,
   },
   text:{
    fontWeight: '700',
    color: 'white',
    textAlign: 'center'
   }
})

export default AuthPressable;