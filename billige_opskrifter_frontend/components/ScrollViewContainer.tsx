import React, { ReactNode } from "react" // Import af React & ReactNode
import { StyleSheet, Dimensions, ScrollView } from "react-native" // Import af react-native komponenter
 
//Passing ReactNode children as props to display elements wihtin the component
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