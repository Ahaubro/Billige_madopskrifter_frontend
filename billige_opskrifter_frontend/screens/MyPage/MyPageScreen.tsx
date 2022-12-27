import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Header from "../../components/Header"
import { useGetRecipesByUserIdQuery } from '../../redux/services/RecipeAPI'
import { Recipe } from "../../redux/services/RecipeAPI"
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import AuthPressable from '../../components/AuthPressable'
import { Ionicons } from '@expo/vector-icons';
import ScrollViewContainer from '../../components/ScrollViewContainer'
import AuthoredRecipeCards from '../../components/AuthoredRecipeCards'
//import { AntDesign } from '@expo/vector-icons';

type MyPageScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'MyPage'>
type MyPageScreenRouteProps = RouteProp<MyPageNavigationParameters, 'MyPage'>

type MyPageScreenProps = {
  navigation: MyPageScreenNavigationProps
  route: MyPageScreenRouteProps
}

const MyPageScreen: React.FC<MyPageScreenProps> = ({ navigation, route }) => {

  const session = useSelector((state: RootState) => state.session)

  //Fetcher brugerens opskrifter og gemmer dem på en liste
  const { data: fetchedRecipesByUserId, isLoading } = useGetRecipesByUserIdQuery(session.id, { refetchOnMountOrArgChange: true });
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

      {/* {isLoading &&
        <View style={{zIndex: 1, backgroundColor: 'grey', height: Dimensions.get("window").height, width: Dimensions.get("window").width}}>
          <AntDesign name="loading1" size={24} color="black" />
        </View>
      } */}


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
  menuHeader: {
    paddingTop: 75,
    paddingBottom: 10,
    fontWeight: '700',
    fontSize: 18
  }
})

export default MyPageScreen