import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, Dimensions, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import BackArrowContainer from '../../components/BackArrowContainer'
import { RootState } from '../../redux/store'
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header'
import ViewContainer from "../../components/ViewContainer"
import { IngredientSearchNavigationParameters } from '../../Types/Navigation_types'
import { Ingredient, useSearchIngredientByMultipleNamesQuery } from "../../redux/services/IngredientAPI"
import DisplayOneRecipe from '../../components/DisplayOneRecipe'


type IngredientSearchResultScreenNavigationProps = StackNavigationProp<IngredientSearchNavigationParameters, 'IngredientSearchResultScreen'>
type IngredientSearchResultScreenRouteProps = RouteProp<IngredientSearchNavigationParameters, 'IngredientSearchResultScreen'>

type IngredientSearchResultScreenProps = {
  navigation: IngredientSearchResultScreenNavigationProps
  route: IngredientSearchResultScreenRouteProps
}

const IngredientSearchResultScreen: React.FC<IngredientSearchResultScreenProps> = ({ navigation, route }) => {

  const session = useSelector((state: RootState) => state.session)

  const { ingredients } = route.params;


  //Laver en string der skal indeholde de navne der skal bruges til at søge efter opskrifter
  let ingredientNames = ""
  ingredients.forEach((ingr) => {
    ingredientNames += ingr.name + ";"
  })


  const [multipleIngrAtr] = useState<{ searchList: string }>({ searchList: ingredientNames })
  const allIngredients = useSearchIngredientByMultipleNamesQuery(multipleIngrAtr, { refetchOnMountOrArgChange: true })
  const [allIngredientsList, setAllIngredientsList] = useState<Ingredient[]>([])


  // Function der fjerner elementer på id, for at fjerne duplikater
  function removeDuplicatesA(arr: Ingredient[]) {
    return arr.filter((v, i, a) => a.findIndex(v2 => (v2.recipeId === v.recipeId)) === i)
  }

  useEffect(() => {
    if (allIngredients.data) {
      setAllIngredientsList(allIngredients.data?.ingredients)
    }
  }, [allIngredients.data])


  //Gemmer en ny liste uden duplikater, der bruges til at hente opskrifter ud fra recipeId (Så der kun vises en af hver)
  const clonedForMapNoDuplicates = removeDuplicatesA([...allIngredientsList])


  return (
    <ViewContainer>

      <BackArrowContainer>
        <Pressable onPress={() => {
          navigation.pop();
        }}>
          <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
        </Pressable>
      </BackArrowContainer>

      <View style={{paddingBottom: 25}}>
        <Header
          text='Opskrifter med de valgte ingredienser'
        />
      </View>


      {/* Der bliver displayet en opskrift for hver af de ingredienser med et unikt RecipeId med komponenten displayOneRecipe */}
      <ScrollView style={{ maxHeight: Dimensions.get('window').height / 100 * 80 }}>
        {clonedForMapNoDuplicates.map((item, index) => {
          return (
            <View key={index}>
              <DisplayOneRecipe
                item={item}
                allIngr={allIngredientsList}
                navigation={navigation}
              />
            </View>
          )
        })}
      </ScrollView>

    </ViewContainer>
  )
}

export default IngredientSearchResultScreen
