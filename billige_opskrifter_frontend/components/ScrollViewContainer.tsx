import React, { ReactNode } from "react" // Import af React
import { StyleSheet, Dimensions, ScrollView } from "react-native" // Import af react-native komponenter
 
//Props
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