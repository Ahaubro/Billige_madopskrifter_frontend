import React, { ReactNode } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"


interface ViewContainerProps {
    children: ReactNode
}

const ScrollViewContainer: React.FC<ViewContainerProps> = (props) => {

    return (
        <ScrollView style={{...style.container}}>
            {props.children}
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        maxHeight: Dimensions.get('window').height,
        maxWidth: Dimensions.get('window').width,
    }
})

export default ScrollViewContainer;