import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { AuthNavigationParameters } from '../../Types/Navigation_types'
import ViewContainer from "../../components/ViewContainer"
import Header from "../../components/Header"


type LoginScreenNavigationProps = StackNavigationProp<AuthNavigationParameters, 'Login'>
type LoginScreenRouteProps = RouteProp<AuthNavigationParameters, 'Login'>

type LoginScreenProps = {
    navigation: LoginScreenNavigationProps
    route: LoginScreenRouteProps
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation, route}) => {

  const session = useSelector((state: RootState) => state.session)

  return (
    <ViewContainer>
      <Header text='Login'/>

      
    </ViewContainer>
  )
}

export default LoginScreen