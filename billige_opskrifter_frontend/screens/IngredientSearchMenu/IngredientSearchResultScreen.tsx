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


  //Laver et string array med ingrediensnavnene
  let ingredientNames = ""

  ingredients.forEach((ingr) => {
    ingredientNames += ingr.name + ";"
  })

  console.log(ingredients)
  console.log(" STRING", ingredientNames)

  const [multipleIngrAtr] = useState<{ searchList: string }>({ searchList: ingredientNames })
  const allIngredients = useSearchIngredientByMultipleNamesQuery(multipleIngrAtr, { refetchOnMountOrArgChange: true })
  const [allIngredientsList, setAllIngredientsList] = useState<Ingredient[]>([])

  // MIDLERTIDIG - Der det skal være muligt at hvor mange ingredienser 

  function removeDuplicatesA(arr: Ingredient[]) {
    return arr.filter((v, i, a) => a.findIndex(v2 => (v2.recipeId === v.recipeId)) === i)
  }

  useEffect(() => {
    if (allIngredients.data) {
      setAllIngredientsList(removeDuplicatesA(allIngredients.data?.ingredients))
    }
  }, [allIngredients.data])


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


      {/* Okay, den er lidt pebberet den her - Der mappes gennem de unikke elementer fra IngredientSearchScreen
          og for hvert element bruges FindRecipesComponent, som bruger samme search funktionalitet fra IngredientSearchScreen
          til at læse ALLE ingredienser der f.eks. indeholder kylling, sådan at man kan få displayet alle opskrifter, uden at man skal kunne 
          vælge fra alle ingredienser(F.eks. kylling x 4, da en ingrediens er registreret til en opskrift.). Inde i FindRecipesComponent kaldes der så 
          på komponenten DisplayOneRecipe, som bruges til at displaye alle de nye funde opskrifter inde i FindRecipesComponent. Altså:
          IngredientResultSearchScreen -> FindRecipesComponent -> DisplayOneRecipe
      */}

      {/* <View>
        {ingredients.map((item, index) => {
          return (
            <View key={item.id}>
                <Text style={{paddingVertical: 10, fontWeight: '700'}}> Opskrifter med {item.name}</Text>
                <FindRecipesComponent item={item}/>
            </View>
          )
        })}
      </View> */}


      {/* DEN HER ER BEDRE AT ARBEJDE VIDERE PÅ!!!! Der læses alle ingredienser fra db her, som der så laves map på med evt. component
      Nu skal der findes en måde at lave noget med match, alt efter hvor mange ingredienser man har */}

      <View>
        {allIngredientsList.map((item, index) => {
          return (
            <View key={item.id}>
              <DisplayOneRecipe item={item} />
            </View>
          )
        })}
      </View>

    </ViewContainer>
  )
}

export default IngredientSearchResultScreen
