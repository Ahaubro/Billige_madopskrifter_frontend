import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Header from "../../components/Header"

interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const session = useSelector((state: RootState) => state.session)

  return (
    <View>
      
        <Header text='Register'/> 
        

    </View>
  )
}

export default RegisterScreen