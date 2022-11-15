import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
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


type MyPageScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'MyPage'>
type MyPageScreenRouteProps = RouteProp<MyPageNavigationParameters, 'MyPage'>

type MyPageScreenProps = {
  navigation: MyPageScreenNavigationProps
  route: MyPageScreenRouteProps
}

const MyPageScreen: React.FC<MyPageScreenProps> = ({ navigation, route }) => {

  const session = useSelector((state: RootState) => state.session)

  const fetchedRecipesByUserId = useGetRecipesByUserIdQuery(session.id, { refetchOnMountOrArgChange: true });
  let userRecipeList: Recipe[] = []

  useEffect(() => {
    if (fetchedRecipesByUserId.data) {
      userRecipeList = fetchedRecipesByUserId.data?.recipes
      console.log(fetchedRecipesByUserId.data?.recipes)
    }
  }, [fetchedRecipesByUserId.data])

  return (
    <ViewContainer>

      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings")
          }}
        >
          <Ionicons name="settings-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <Header
        text='Min side'
      />

      <View style={{paddingTop: 500}}>

        {(fetchedRecipesByUserId.data?.recipes && fetchedRecipesByUserId.data?.recipes) &&
          <>
            <Text style={{fontSize: 14, fontWeight: '700'}}>Authored recipes:</Text>
            <View style={style.recipeCards}>
              <FlatList horizontal={true} data={fetchedRecipesByUserId.data?.recipes || []} renderItem={({ item, index }) => {
                return (
                  <>
                    <View style={{ paddingEnd: Dimensions.get("window").width / 100 * 2 }}>
                      <View style={style.authoredRecipes}>
                        <Text>{item.name}</Text>
                        <Text>{item.type}</Text>
                        <Text>{item.prepTime}</Text>
                        <Text>{item.numberOfPersons}</Text>
                        <Text>{item.estimatedPrice}</Text>
                      </View>
                    </View>
                  </>
                )
              }} />
            </View>
          </>
        }

        <View style={{ paddingVertical: 10 }}></View>

        <AuthPressable
          text='Ny opskrift'
          color='#86DB9D'
          onPress={() => {
            navigation.navigate("CreateRecipe", { userId: session.id })
          }}
        />


      </View>

    </ViewContainer>
  )
}

const style = StyleSheet.create({
  authoredRecipes: {
    backgroundColor: "rgb(247,247,255)",
    width: Dimensions.get("window").width / 100 * 94,
    borderRadius: 15,
    paddingVertical: 8
  },
  recipeCards: {
    maxHeight: 400,
  }
})

export default MyPageScreen