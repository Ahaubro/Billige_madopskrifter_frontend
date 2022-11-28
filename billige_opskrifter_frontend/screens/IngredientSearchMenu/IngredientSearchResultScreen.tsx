import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Text, View, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BackArrowContainer from '../../components/BackArrowContainer'
import { RootState } from '../../redux/store'
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header'
import ViewContainer from "../../components/ViewContainer"
import { IngredientSearchNavigationParameters } from '../../Types/Navigation_types'
import DisplayOneRecipe from '../../components/DisplayOneRecipe'


type IngredientSearchResultScreenNavigationProps = StackNavigationProp<IngredientSearchNavigationParameters, 'IngredientSearchResultScreen'>
type IngredientSearchResultScreenRouteProps = RouteProp<IngredientSearchNavigationParameters, 'IngredientSearchResultScreen'>

type IngredientSearchResultScreenProps = {
  navigation: IngredientSearchResultScreenNavigationProps
  route: IngredientSearchResultScreenRouteProps
}

const IngredientSearchResultScreen: React.FC<IngredientSearchResultScreenProps> = ({ navigation, route }) => {

  const session = useSelector((state: RootState) => state.session)

  const { ingredients } =  route.params;

  // Get ingredients by name med en contains method i backend, så du får alle ingredienser med kylling f.eks.
  //Brug herefter evt. komponentet til at vise dem. Og tjek i samme forbindelse om hvor vidt andre ingrdienser fra den oprindelige 
  //liste tilhøhrer samme opskrift, for at kunne påbegynde det match noget

  //Object er egentlig ligemeget, her skal jeg bare bruge navnet for at lave ale søgningerne igen(men behold obj for nu - name er navnet der kan tælle for flere)

  console.log(ingredients)

  //Get ingredients by name


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


      {ingredients.map( (item, index) => {
        return (
            <View key={index}>
                <DisplayOneRecipe item={item} />
            </View>
        )
      })}







     

    </ViewContainer>
  )
}

export default IngredientSearchResultScreen
