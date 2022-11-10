import React, { ReactNode } from "react"
import { View, StyleSheet, Dimensions } from "react-native"


interface ViewContainerProps {
    children: ReactNode
}

const ViewContainer: React.FC<ViewContainerProps> = (props) => {

    return (
        <View style={{...style.container}}>
            {props.children}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        maxHeight: Dimensions.get('window').height,
        maxWidth: Dimensions.get('window').width
    }
})

export default ViewContainer;