import React, { useEffect, useState } from 'react' // Import af funktionelle komponenter fra React
import { StyleSheet, View, Text, Dimensions } from 'react-native' // Import af react-native komponenter
import { StackNavigationProp } from '@react-navigation/stack' // Import af stackNavigationProp (Del af template projektet)
import { useSelector } from 'react-redux' // Import af useSelector (Del af template projektet)
import { RootState } from '../../redux/store' // Import af RootState (Del af template projektet)
import ViewContainer from "../../components/ViewContainer" // Import af min view container komponent
import { useGetLikedRecipesByUserIdQuery } from "../../redux/services/LikedRecAPI" // Import af min funktionelle komponent useGetLikedRecipesByUserIdQuery
import { Recipe } from '../../redux/services/RecipeAPI' // Import af min Recipe type
import { HomeNavigationParameters } from '../../Types/Navigation_types' // Import af min homeNavigationParameters type
import LikedRecipeCards from '../../components/LikedRecipeCards' // Import af min liked recipes komponent
import AuthPressable from '../../components/AuthPressable' // Import af min knap komponent
import HeaderWithoutBackcontainer from '../../components/HeaderWithoutBackcontainer' // Import af header without back arrow komponent

// Sætter navigations & route props
type HomeScreenNavigationProps = StackNavigationProp<HomeNavigationParameters, 'HomeScreen'>

type HomeScreenProps = {
  navigation: HomeScreenNavigationProps
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

  const session = useSelector((state: RootState) => state.session)
  let userName: string | undefined = session.fullName

  // Fetcher likedRecipes og bruger refetchonmountorargchange & useEffect til at opdatere 
  const fetchedLikedRecipes = useGetLikedRecipesByUserIdQuery(session.id, { refetchOnMountOrArgChange: true });
  const [likedRecipeList, setLikedRecipeList] = useState<Recipe[]>([]);

  useEffect(() => {
    if (fetchedLikedRecipes.data) {
      setLikedRecipeList(fetchedLikedRecipes.data.recipes)
    }

  }, [fetchedLikedRecipes.data])

  //Slicer fulde navn ved mellemrum
  function getFirstName(fullName: string | undefined){
    if(fullName == undefined){
      return null
    } else {
      return fullName.substring(0, fullName.indexOf(" "));
    }
  }

  return (
    <ViewContainer>

      <HeaderWithoutBackcontainer 
        text={'Velkommen' + " " + getFirstName(userName)}
      />

      <Text style={style.menuHeader}> Opskrifter du har liket.</Text>

      {/* Kort der vises hvis man ikke har liket nogen opskrifter endnu  */}
      {likedRecipeList.length == 0 &&

        <View style={style.likedRecipes}>
          <Text>Du har ikke liket nogen opskrifter, kom igang!</Text>
        </View>
      }

      <View style={{paddingBottom: 15}}>

        <LikedRecipeCards
          recipes={likedRecipeList}
          navigation={navigation}
        />

      </View>

      <AuthPressable 
        text='Find flere opskrifter nu!'
        color='#86C3F7'
        onPress={ () => {
          navigation.navigate("ChooseRecipe")
        }}
      />

    </ViewContainer>
  )
}

const style = StyleSheet.create({
  likedRecipes: {
    width: Dimensions.get("window").width / 100 * 98,
    backgroundColor: "rgb(247,247,255)",
    borderRadius: 15,
    padding: 12,
    minHeight: Dimensions.get("window").height / 100 * 14,
    maxHeight: Dimensions.get("window").height / 100 * 14,
  },
  menuHeader:{
    paddingTop: 75, 
    paddingBottom: 10, 
    fontWeight: '700', 
    fontSize: 18 
  }
})

export default HomeScreen
