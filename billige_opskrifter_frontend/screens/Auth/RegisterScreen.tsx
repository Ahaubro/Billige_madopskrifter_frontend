import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Header from "../../components/Header"
import ViewContainer from '../../components/ViewContainer'
import BackArrowContainer from "../../components/BackArrowContainer"
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { AuthNavigationParameters } from '../../Types/Navigation_types'
import { Ionicons } from '@expo/vector-icons';

type RegisterScreenNavigationProps = StackNavigationProp<AuthNavigationParameters, 'Register'>
type RegisterScreenRouteProps = RouteProp<AuthNavigationParameters, 'Register'>

type RegisterScreenProps = {
    navigation: RegisterScreenNavigationProps
    route: RegisterScreenRouteProps
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation, route }) => {
  const session = useSelector((state: RootState) => state.session)

  return (
    <ViewContainer>
        <BackArrowContainer>
            <Pressable onPress={ () => {
                navigation.pop();
            }}>
                <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
            </Pressable>
        </BackArrowContainer>
      
        <Header text='Register'/> 


    </ViewContainer>
  )
}

export default RegisterScreen