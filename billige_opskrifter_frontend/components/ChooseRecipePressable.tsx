import { FontDisplay } from "expo-font"
import React from "react"
import { View, StyleSheet, Text, TouchableOpacity,  } from "react-native"


type ChooseRecipePressableProps = {
    text: string,
    onPress: () => void
}

const ChooseRecipePressable: React.FC<ChooseRecipePressableProps> = ({ text, onPress }) => {

    return (
        <View>
            <TouchableOpacity style={[style.btn, {backgroundColor: '#86C3F7'}]}
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
    paddingVertical: 25,
   },
   text:{
    fontWeight: '700',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
   }
})

export default ChooseRecipePressable;