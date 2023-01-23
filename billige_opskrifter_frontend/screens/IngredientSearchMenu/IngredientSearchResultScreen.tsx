import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af template projektet)
import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import React, { useState, useEffect } from 'react' // Import af funktionelle komponenter fra React
import { Text, View, Pressable, Dimensions, ScrollView } from 'react-native' // Import af react-native komponenter
import BackArrowContainer from '../../components/BackArrowContainer' // Import af min back arrow container komponent
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import Header from '../../components/Header' // Import af min header komponent
import ViewContainer from "../../components/ViewContainer" // Import af min view container komponent
import { IngredientSearchNavigationParameters } from '../../Types/Navigation_types' // Import af min IngredientSearchNavigationParameters type
import { Ingredient, useSearchIngredientByMultipleNamesQuery } from "../../redux/services/IngredientAPI" // Import af funktionel komponent og Ingredient typen fra mit IngredientAPI
import DisplayOneRecipe from '../../components/DisplayOneRecipe' // Import af min display one recipe komponent

// Sætter navigations & route props
type IngredientSearchResultScreenNavigationProps = StackNavigationProp<IngredientSearchNavigationParameters, 'IngredientSearchResultScreen'>
type IngredientSearchResultScreenRouteProps = RouteProp<IngredientSearchNavigationParameters, 'IngredientSearchResultScreen'>

type IngredientSearchResultScreenProps = {
  navigation: IngredientSearchResultScreenNavigationProps
  route: IngredientSearchResultScreenRouteProps
}

const IngredientSearchResultScreen: React.FC<IngredientSearchResultScreenProps> = ({ navigation, route }) => {

  const { ingredients } = route.params;

  //Laver en string der skal indeholde de navne der skal bruges til at søge efter opskrifter
  let ingredientNames = ""
  ingredients.forEach((ingr) => {
    ingredientNames += ingr.name + ";"
  })

  
  // Fetcher på den string der er instantieret ovenfor
  const [multipleIngrAtr] = useState<{ searchList: string }>({ searchList: ingredientNames })
  const allIngredients = useSearchIngredientByMultipleNamesQuery(multipleIngrAtr, { refetchOnMountOrArgChange: true })
  const [allIngredientsList, setAllIngredientsList] = useState<Ingredient[]>([])


  // Function der fjerner duplikater på id
  function removeDuplicatesByRecipeId(arr: Ingredient[]) {
    return arr.filter((v, i, a) => a.findIndex(v2 => (v2.recipeId === v.recipeId)) === i)
  }

  useEffect(() => {
    if (allIngredients.data) {
      setAllIngredientsList(allIngredients.data?.ingredients)
    }
  }, [allIngredients.data])


  //Gemmer en ny liste uden duplikater, der bruges til at hente opskrifter ud fra recipeId (Så der kun vises en af hver)
  const clonedForMapNoDuplicates = removeDuplicatesByRecipeId([...allIngredientsList])


  return (
    <ViewContainer>

      <BackArrowContainer>
        <Pressable onPress={() => {
          navigation.pop();
        }}>
          <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
        </Pressable>
      </BackArrowContainer>

      <View style={{paddingBottom: 40}}>
        <Header
          text='Opskrifter med de valgte ingredienser'
        />
      </View>


      {/* Der bliver displayet en opskrift for hver af de ingredienser med et unikt RecipeId med komponenten displayOneRecipe */}
      <ScrollView style={{ maxHeight: Dimensions.get("window").height / 100 * 67, paddingBottom: 15 }}>
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
