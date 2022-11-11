import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import ViewContainer from "../../components/ViewContainer"
import Header from "../../components/Header"
import { useCreateMutation, useGetRecipesByUserIdQuery } from '../../redux/services/RecipeAPI'
import { Recipe } from "../../redux/services/RecipeAPI"

interface MyPageScreenProps { }

const MyPageScreen: React.FC<MyPageScreenProps> = () => {

  const session = useSelector((state: RootState) => state.session)

  const [create] = useCreateMutation();
  const [createAtr, setCreateAtr] = useState<{ name: string, type: string, prepTime: number, numberOfPersons: number, estimatedPrice: number, userId: number }>
    ({ name: "", type: "", prepTime: 0, numberOfPersons: 0, estimatedPrice: 0, userId: session.id });

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

      <TouchableOpacity onPress={ () => {
        
      }}>

      </TouchableOpacity>



    </ViewContainer>
  )
}

const style = StyleSheet.create({
  authoredRecipes: {
    backgroundColor: "rgb(242,242,242)",
    width: Dimensions.get("window").width
  }
})

export default MyPageScreen