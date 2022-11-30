import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
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


  //  //Funtion der sender os de ingredienser med samme recipeId
  //  function getDuplicates(arr: Ingredient[]) {
  //   return arr.filter((v, i, a) => a.findIndex(v2 => (v2.recipeId === v.recipeId)) !== i)
  // }

  // //Gemmer en ny liste der kun indeholder ingredienser med samme recipeId (Skal bruges til at tjekke hvor mange ingredienser opskriften matcher med)
  // const matchingIngredients = getDuplicates([...allIngredientsList])
  // console.log("Til at tjekke matches", matchingIngredients)


  return (
    <ViewContainer>

      <BackArrowContainer>
        <Pressable onPress={() => {
          navigation.pop();
        }}>
          <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
        </Pressable>
      </BackArrowContainer>


      <Header
        text='Resultater'
      />


      {/* DEN HER ER BEDRE AT ARBEJDE VIDERE PÅ!!!! Der læses alle ingredienser fra db her, som der så laves map på med evt. component
      Nu skal der findes en måde at lave noget med match, alt efter hvor mange ingredienser man har 
      For nu skal der udtænkes en måde hvor at der kan tjekkes hvor mange ingredienser der findes på hver opskrift, uden at opskriften skal displayes flere gange
      For nu virker det fordi at allIngrList får fjernet duplikater med samme recipeId i useEffect, men disse skal nok bruges for at tjekke efter match, så der skal opsættes en
      anden måde at vise opskrifter en de komponenter der bruges nu. Ellers skal de laves om.
      */}


      <View style={{flex: 1}}>
        {clonedForMapNoDuplicates.map((item, index) => {
          return (
            <View key={index}>
              <DisplayOneRecipe
                item={item}
                allIngr={allIngredientsList}
              />
            </View>
          )
        })}
      </View>

    </ViewContainer>
  )
}

export default IngredientSearchResultScreen
