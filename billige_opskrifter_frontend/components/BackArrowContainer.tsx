import React, { ReactNode } from 'react'
import { Text, View, StyleSheet } from 'react-native'

interface BackArrowContainerProps {
    children: ReactNode
}

const BackArrowContainer: React.FC<BackArrowContainerProps> = (BackArrowContainerProps) => {

  return (
    <View style={style.container}>
      {BackArrowContainerProps.children}
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        justifyContent: 'flex-start',
        paddingTop: 30
    }
})

export default BackArrowContainer