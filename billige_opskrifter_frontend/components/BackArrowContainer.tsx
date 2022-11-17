import React, { ReactNode } from 'react'
import { Text, View, StyleSheet } from 'react-native'

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