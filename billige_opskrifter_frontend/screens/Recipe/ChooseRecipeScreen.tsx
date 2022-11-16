import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import HeaderWithoutBack from '../../components/HeaderWithoutBack'
import ViewContainer from "../../components/ViewContainer"
import ChooseRecipePressable from '../../components/ChooseRecipePressable'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RecipeNavigationParameters } from '../../Types/Navigation_types'


type ChooseRecipeScreenNavigationProps = StackNavigationProp<RecipeNavigationParameters, 'ChooseRecipe'>
type ChooseRecipeScreenRouteProps = RouteProp<RecipeNavigationParameters, 'ChooseRecipe'>

type ChooseRecipeScreenProps = {
  navigation: ChooseRecipeScreenNavigationProps
  route: ChooseRecipeScreenRouteProps
}

const ChooseRecipeScreen: React.FC<ChooseRecipeScreenProps> = ( { navigation, route } ) => {

  const session = useSelector((state: RootState) => state.session)

  //Lav en recipeScreen der tager en hardcoded string med som route params
  //Lav herefter en liste hvor alle opskrifter bliver læst ind, og filtrer så listen
  //ved type fra route params item.type for at have en dynamisk side der kan behandle hver type


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
          const type = "Morgenmad"
          navigation.navigate("RecipesScreen", {type})
        }}
      />

      <View style={{ paddingTop: 15 }}></View>

      <ChooseRecipePressable
        text='Aftensmad'
        onPress={() => {
          //Til middagsmad
          const type = "Aftensmad"
          navigation.navigate("RecipesScreen", {type})
        }}
      />

      <View style={{ paddingTop: 15 }}></View>

      <ChooseRecipePressable
        text='Dessert'
        onPress={() => {
          //Til dessert
          const type = "Dessert"
          navigation.navigate("RecipesScreen", {type})
        }}
      />

    </ViewContainer>
  )
}

const styles = StyleSheet.create({

})

export default ChooseRecipeScreen
