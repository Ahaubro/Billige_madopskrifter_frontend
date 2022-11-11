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


type MyPageScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'MyPage'>
type MyPageScreenRouteProps = RouteProp<MyPageNavigationParameters, 'MyPage'>

type MyPageScreenProps = {
    navigation: MyPageScreenNavigationProps
    route: MyPageScreenRouteProps
}

const MyPageScreen: React.FC<MyPageScreenProps> = ( {navigation, route} ) => {

  const session = useSelector((state: RootState) => state.session)

  const fetchedRecipesByUserId = useGetRecipesByUserIdQuery(session.id, {refetchOnMountOrArgChange: false});
  let userRecipeList: Recipe[] = []

  useEffect(() => {
    if (fetchedRecipesByUserId.data) {
      userRecipeList = fetchedRecipesByUserId.data?.recipes
      console.log(fetchedRecipesByUserId.data?.recipes)
      console.log(fetchedRecipesByUserId.data.recipes)
    }
  }, [fetchedRecipesByUserId.data])

  return (
    <ViewContainer>

      <Header
        text='Min side'
      />

      {(fetchedRecipesByUserId.data?.recipes && fetchedRecipesByUserId.data?.recipes) &&
        <>
          <Text>Authored recipes:</Text>
          <View style={{ flex: 1, maxHeight: 300 }}>
            <FlatList horizontal={true} data={fetchedRecipesByUserId.data?.recipes || []} renderItem={({ item, index }) => {
              return (
                <>
                  <View style={style.authoredRecipes}>
                    <Text>{item.name}</Text>
                    <Text>{item.type}</Text>
                    <Text>{item.prepTime}</Text>
                    <Text>{item.numberOfPersons}</Text>
                    <Text>{item.estimatedPrice}</Text>
                    <Text>{item.name}</Text>
                  </View>
                </>
              )
            }} />
          </View>
        </>
      }

      <View style={{paddingVertical: 10}}></View>

      <AuthPressable 
        text='Ny opskrift'
        color='#86DB9D'
        onPress={ () => {
          navigation.navigate("CreateRecipe", {userId: session.id})
        }}
      />
      

    </ViewContainer>
  )
}

const style = StyleSheet.create({
  authoredRecipes: {
    backgroundColor: "rgb(242,242,242)",
    width: Dimensions.get("window").width
  },
})

export default MyPageScreen