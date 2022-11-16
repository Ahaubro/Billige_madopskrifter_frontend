import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { StatusBar } from 'expo-status-bar'
import { FONTS } from '../../utils/fontUtils'
import i18n from 'i18n-js'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import HeaderWithoutBack from '../../components/HeaderWithoutBack'
import ViewContainer from "../../components/ViewContainer"

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {

  const session = useSelector((state: RootState) => state.session)
  

  return (
    <ViewContainer>
      
      <HeaderWithoutBack 
        text='Home'
      />

    </ViewContainer>
  )
}

const styles = StyleSheet.create({
  
})

export default HomeScreen
