import React, { ReactNode } from 'react' // Import af React til brug af FC - functionComponent
import { View, StyleSheet } from 'react-native' // Import af react native komponenter


//props - denne komponent skal kunne indholde diverse React elementer
interface BackArrowContainerProps {
  children: ReactNode
}

const BackArrowContainer: React.FC<BackArrowContainerProps> = (BackArrowContainerProps) => {

  return (
    <View style={style.container}>
      <View style={{paddingTop: 30}}>
        {BackArrowContainerProps.children}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  }
})

export default BackArrowContainer