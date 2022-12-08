import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Header from '../../components/Header'
import ViewContainer from "../../components/ViewContainer"
import { useGetLikedRecipesByUserIdQuery, useAddLikedRecipeMutation } from "../../redux/services/LikedRecAPI"
import { Recipe } from '../../redux/services/RecipeAPI'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { HomeNavigationParameters } from '../../Types/Navigation_types'
import LikedRecipeCards from '../../components/LikedRecipeCards'
import AuthPressable from '../../components/AuthPressable'
import HeaderWithoutBackcontainer from '../../components/HeaderWithoutBackcontainer'


type HomeScreenNavigationProps = StackNavigationProp<HomeNavigationParameters, 'HomeScreen'>
type HomeScreenRouteProps = RouteProp<HomeNavigationParameters, 'HomeScreen'>

type HomeScreenProps = {
  navigation: HomeScreenNavigationProps
  route: HomeScreenRouteProps
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {

  const session = useSelector((state: RootState) => state.session)
  let userName: string | undefined = session.fullName

  const fetchedLikedRecipes = useGetLikedRecipesByUserIdQuery(session.id, { refetchOnMountOrArgChange: true });
  const [likedRecipeList, setLikedRecipeList] = useState<Recipe[]>([]);

  //

  useEffect(() => {
    if (fetchedLikedRecipes.data) {
      setLikedRecipeList(fetchedLikedRecipes.data.recipes)
    }

  }, [fetchedLikedRecipes.data])

  //Slicing the logged in users full for greeting
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
