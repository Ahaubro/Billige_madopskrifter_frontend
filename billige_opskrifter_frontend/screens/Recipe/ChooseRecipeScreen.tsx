import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import HeaderWithoutBack from '../../components/HeaderWithoutBack'
import ViewContainer from "../../components/ViewContainer"
import ChooseRecipePressable from '../../components/ChooseRecipePressable'

interface ChooseRecipeScreenProps { }

const ChooseRecipeScreen: React.FC<ChooseRecipeScreenProps> = () => {

  const session = useSelector((state: RootState) => state.session)


  return (
    <ViewContainer>

      <HeaderWithoutBack
        text='Opskrifter'
      />

      <View style={{ paddingTop: 100 }}></View>

      <ChooseRecipePressable
        text='Morgenmad'
        onPress={() => {
          //Til morgenmad
        }}
      />

      <View style={{ paddingTop: 15 }}></View>

      <ChooseRecipePressable
        text='Middagsmad'
        onPress={() => {
          //Til middagsmad
        }}
      />

      <View style={{ paddingTop: 15 }}></View>

      <ChooseRecipePressable
        text='Dessert'
        onPress={() => {
          //Til dessert
        }}
      />

    </ViewContainer>
  )
}

const styles = StyleSheet.create({

})

export default ChooseRecipeScreen
