import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import ViewContainer from "../../components/ViewContainer"
import Header from "../../components/Header"
import { useGetRecipesByUserIdQuery } from '../../redux/services/RecipeAPI'
import { Recipe } from "../../redux/services/RecipeAPI"
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import AuthPressable from '../../components/AuthPressable'
import { Ionicons } from '@expo/vector-icons';
import { useGetAllergiesByUserIdQuery, useDeleteAllergiMutation, Allergi } from "../../redux/services/AllergiAPI"
import ScrollViewContainer from '../../components/ScrollViewContainer'
import RecipeCard from '../../components/RecipeCard'
import AuthoredRecipeCards from '../../components/AuthoredRecipeCards'


type MyPageScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'MyPage'>
type MyPageScreenRouteProps = RouteProp<MyPageNavigationParameters, 'MyPage'>

type MyPageScreenProps = {
  navigation: MyPageScreenNavigationProps
  route: MyPageScreenRouteProps
}

const MyPageScreen: React.FC<MyPageScreenProps> = ({ navigation, route }) => {

  const session = useSelector((state: RootState) => state.session)

  //Fetcher brugerens opskrifter og gemmer dem på en liste
  const fetchedRecipesByUserId = useGetRecipesByUserIdQuery(session.id, { refetchOnMountOrArgChange: true });
  const [userRecipeList, setUserRecipeList] = useState<Recipe[]>([]);

  useEffect(() => {
    if (fetchedRecipesByUserId.data) {
      setUserRecipeList(fetchedRecipesByUserId.data?.recipes)
    }
  }, [fetchedRecipesByUserId.data])


  return (
    <ScrollViewContainer>

      {/* Navigate to settings */}
      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingTop: 25, paddingBottom: 5, paddingRight: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings")
          }}
        >
          <Ionicons name="settings-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>


      {/* Header for MyPage */}
      <View style={{ paddingTop: -15 }}>
        <Header
          text='Min side'
        />
      </View>

 


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
        <View style={{ paddingVertical: 10 }}>

          <AuthPressable
            text='Ny opskrift'
            color='#86DB9D'
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
  menuHeader:{
    paddingTop: 75, 
    paddingBottom: 10, 
    fontWeight: '700', 
    fontSize: 18 
  }
})

export default MyPageScreen