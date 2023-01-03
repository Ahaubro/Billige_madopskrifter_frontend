import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import React from 'react' // Import af React
import { Text, View, TouchableOpacity } from 'react-native' // Import af react-native komponenter
import { useDispatch, useSelector } from 'react-redux' // Import af useDispatch & useSelector (Del af template projektet)
import { RootState } from '../../redux/store' // Import af RootState (Del af template projektet)
import ViewContainer from "../../components/ViewContainer" // Import af min view container komponent
import ChooseRecipePressable from '../../components/ChooseRecipePressable' // Import af min choose recipe knap komponent
import { RecipeNavigationParameters } from '../../Types/Navigation_types' // Import af min recipe navigations parameter type
import { endSession } from '../../redux/slices/sessionSlice' // Import af endSession (Del af template projektet)
import HeaderWithoutBackcontainer from '../../components/HeaderWithoutBackcontainer' // Import af min header without back arrow container komponent 


type ChooseRecipeScreenNavigationProps = StackNavigationProp<RecipeNavigationParameters, 'ChooseRecipe'>

type ChooseRecipeScreenProps = {
  navigation: ChooseRecipeScreenNavigationProps
}

const ChooseRecipeScreen: React.FC<ChooseRecipeScreenProps> = ({ navigation }) => {

  //Instantiere et session objekt
  const session = useSelector((state: RootState) => state.session)
  const dispatch = useDispatch();


  return (
    <ViewContainer>

      <HeaderWithoutBackcontainer
        text='Vælg opskrift type'
      />


      <View style={{ paddingTop: 100 }}></View>


      {/* Der er nedenfor opsat en knap til hver af opskrifts typerne (Tilføj en knap her samt en type for flere menuer) */}
      <ChooseRecipePressable
        color="#F0C765"
        text='Morgenmad'
        onPress={() => {
          const type = "Morgenmad"
          navigation.navigate("RecipesScreen", { type })
        }}
      />

      <View style={{ paddingTop: 15 }}></View>

      <ChooseRecipePressable
        color="#F06565"
        text='Aftensmad'
        onPress={() => {
          const type = "Aftensmad"
          navigation.navigate("RecipesScreen", { type })
        }}
      />

      <View style={{ paddingTop: 15 }}></View>

      <ChooseRecipePressable
        color="#64E1EF"
        text='Dessert'
        onPress={() => {
          const type = "Dessert"
          navigation.navigate("RecipesScreen", { type })
        }}
      />

      <View style={{ paddingTop: 15 }}></View>

      <ChooseRecipePressable
        color="#62E88F"
        text='Snacks'
        onPress={() => {
          const type = "Snacks"
          navigation.navigate("RecipesScreen", { type })
        }}
      />

      {/* Hvis man er forsat som gæst, kan man her "logge ud" */}
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

export default ChooseRecipeScreen
