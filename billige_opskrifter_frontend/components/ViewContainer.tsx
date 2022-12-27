import React, { ReactNode } from "react" // Import af React samt ReactNode
import { View, StyleSheet, Dimensions } from "react-native" // Import af react-native komponetner

// Props
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
        padding: 10,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    }
})

export default ViewContainer;