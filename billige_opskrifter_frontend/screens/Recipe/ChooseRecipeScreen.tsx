import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import ViewContainer from "../../components/ViewContainer"
import ChooseRecipePressable from '../../components/ChooseRecipePressable'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RecipeNavigationParameters } from '../../Types/Navigation_types'
import { endSession } from '../../redux/slices/sessionSlice'
import HeaderWithoutBackcontainer from '../../components/HeaderWithoutBackcontainer'


type ChooseRecipeScreenNavigationProps = StackNavigationProp<RecipeNavigationParameters, 'ChooseRecipe'>
type ChooseRecipeScreenRouteProps = RouteProp<RecipeNavigationParameters, 'ChooseRecipe'>

type ChooseRecipeScreenProps = {
  navigation: ChooseRecipeScreenNavigationProps
  route: ChooseRecipeScreenRouteProps
}

const ChooseRecipeScreen: React.FC<ChooseRecipeScreenProps> = ({ navigation, route }) => {

  const session = useSelector((state: RootState) => state.session)
  const dispatch = useDispatch();


  return (
    <ViewContainer>

      <HeaderWithoutBackcontainer
        text='Vælg opskrift type'
      />


      <View style={{ paddingTop: 100 }}></View>

      <ChooseRecipePressable
        color="#F5F587"
        text='Morgenmad'
        onPress={() => {
          const type = "Morgenmad"
          navigation.navigate("RecipesScreen", { type })
        }}
      />

      <View style={{ paddingTop: 15 }}></View>

      <ChooseRecipePressable
        color="#90F1FC"
        text='Aftensmad'
        onPress={() => {
          const type = "Aftensmad"
          navigation.navigate("RecipesScreen", { type })
        }}
      />

      <View style={{ paddingTop: 15 }}></View>

      <ChooseRecipePressable
        color="#F9B1F6"
        text='Dessert'
        onPress={() => {
          const type = "Dessert"
          navigation.navigate("RecipesScreen", { type })
        }}
      />

      <View style={{ paddingTop: 15 }}></View>

      <ChooseRecipePressable
        color="#A5F9C1"
        text='Snacks'
        onPress={() => {
          const type = "Snacks"
          navigation.navigate("RecipesScreen", { type })
        }}
      />

      {session.token == "guest" &&
        <TouchableOpacity
          onPress={() => {
            dispatch(endSession())
          }}
        >
          <Text style={{ textAlign: 'center', fontStyle: 'italic', fontWeight: '600', paddingVertical: 15 }}> Tilbage til start</Text>
        </TouchableOpacity>
      }


    </ViewContainer>
  )
}

const styles = StyleSheet.create({

})

export default ChooseRecipeScreen
