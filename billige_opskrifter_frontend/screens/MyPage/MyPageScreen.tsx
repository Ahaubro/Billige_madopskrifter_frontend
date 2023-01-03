import React, { useEffect, useState } from 'react' // Import af funktionelle komponenter fra React
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native' // IMport af react-native komponenter
import { useSelector } from 'react-redux' // Import af useSelector (Del af template projektet)
import { RootState } from '../../redux/store' // Import af RootState (Del af template projektet)
import Header from "../../components/Header" // Import af min header komponent
import { useGetRecipesByUserIdQuery, Recipe } from '../../redux/services/RecipeAPI' // Import af funktionel komponent og type fra mit RecipeAPI
import { MyPageNavigationParameters } from '../../Types/Navigation_types' // Import af min my page navigation parameters type
import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import AuthPressable from '../../components/AuthPressable' // Import af min knap komponent
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import ScrollViewContainer from '../../components/ScrollViewContainer' // Import af min Scroll view container komponent
import AuthoredRecipeCards from '../../components/AuthoredRecipeCards' // Import af min Authored recipe cards komponent

// Sætter navigations & route props
type MyPageScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'MyPage'>

type MyPageScreenProps = {
  navigation: MyPageScreenNavigationProps
}

const MyPageScreen: React.FC<MyPageScreenProps> = ({ navigation }) => {

  const session = useSelector((state: RootState) => state.session)

  //Fetcher brugerens opskrifter og gemmer dem på en liste
  const { data: fetchedRecipesByUserId } = useGetRecipesByUserIdQuery(session.id, { refetchOnMountOrArgChange: true });
  const [userRecipeList, setUserRecipeList] = useState<Recipe[]>([]);

  useEffect(() => {
    if (fetchedRecipesByUserId?.recipes) {
      setUserRecipeList(fetchedRecipesByUserId.recipes)
    }
  }, [fetchedRecipesByUserId])


  return (
    <ScrollViewContainer>

      {/* Navigate to settings */}
      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingTop: 30, paddingRight: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings")
          }}
        >
          <Ionicons name="settings-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>


      {/* Header for MyPage */}
      <Header
        text='Min side'
      />


      {/* Her displayes opskrifter der er skrevet af brugeren, som også fungere som et link til SelectedReciopeScreen */}
      <View>
        <Text style={style.menuHeader}>Opskrifter skrevet af dig.</Text>

        {userRecipeList.length > 0 ?
          <>
            <View>
              <AuthoredRecipeCards
                recipes={userRecipeList}
                navigation={navigation}
              />

            </View>

          </>
          :
          <Text style={{ textAlign: 'center', paddingVertical: 15 }}>Lav din første opskrift idag!</Text>
        }


        {/* Opret ny opskrfit  */}
        <View style={{ paddingTop: 15 }}>
          <AuthPressable
            text='Tilføj en ny opskrift'
            color='#86C3F7'
            onPress={() => {
              navigation.navigate("CreateRecipe", { userId: session.id })
            }}
          />

        </View>
      </View>

    </ScrollViewContainer >
  )
}

const style = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 5
  },
  menuHeader: {
    paddingTop: 75,
    paddingBottom: 10,
    fontWeight: '700',
    fontSize: 18
  }
})

export default MyPageScreen