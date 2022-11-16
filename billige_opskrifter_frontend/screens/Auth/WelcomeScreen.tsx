import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Pressable, Text, View, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import {AuthNavigationParameters} from "../../Types/Navigation_types"
import ViewContainer from "../../components/ViewContainer"
import Header from "../../components/Header"
import AuthPressable from "../../components/AuthPressable"


type WelcomeScreenNavigationProps = StackNavigationProp<AuthNavigationParameters, 'Welcome'>
type WelcomeScreenRouteProps = RouteProp<AuthNavigationParameters, 'Welcome'>

type WelcomeScreenProps = {
    navigation: WelcomeScreenNavigationProps
    route: WelcomeScreenRouteProps
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation, route}) => {

  const session = useSelector((state: RootState) => state.session)

  return (
    <ViewContainer>
      
      <View style={{paddingTop: 180}}>
        <Image style={{width: 430, height: 200}} source={require('../../assets/forsidebillede.png')}/>
      </View>

      <AuthPressable 
        text='Login'
        color='#86C3F7'
        onPress={() => {
            navigation.navigate('Login')
        }}
      />

      <View style={{paddingVertical: 7}}></View>

      <AuthPressable 
        text='Opret'
        color='#86C3F7'
        onPress={() => {
            navigation.navigate('Register')
        }}
      />
      
    </ViewContainer>
  )
}

export default WelcomeScreen