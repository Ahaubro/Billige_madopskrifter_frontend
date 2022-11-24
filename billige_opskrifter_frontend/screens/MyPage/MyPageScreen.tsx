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
import { useCreateAllergiMutation, useGetAllergiesByUserIdQuery, useDeleteAllergiMutation, Allergi } from "../../redux/services/AllergiAPI"


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


  // Fetcher brugerens allergier
  const fetchedUserAllergies = useGetAllergiesByUserIdQuery(session.id, { refetchOnMountOrArgChange: true });
  const [userAllergiesList, setUsersAllergiesList] = useState<Allergi[]>([]);

  useEffect(() => {
    if (fetchedUserAllergies.data) {
      setUsersAllergiesList(fetchedUserAllergies.data.allergies)
    }
  }, [fetchedUserAllergies.data])


  //Slet allergie
  const [deleteAllergi] = useDeleteAllergiMutation();

  //Create allergie
  const [createAllergiAtr, setCreateAllergiAtr] = useState<{ userId: number, allergi: string }>({ userId: 0, allergi: '' });
  const [createAllergi] = useCreateAllergiMutation();

  return (
    <ViewContainer>

      {/* Navigate to settings */}
      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings")
          }}
        >
          <Ionicons name="settings-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>


      {/* Header for MyPage */}
      <View style={{ paddingTop: -5 }}>
        <Header
          text='Min side'
        />
      </View>

      <View style={{ paddingTop: 25 }}>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '600' }}>Velkommen {session.fullName}</Text>
      </View>


      {/* Allergies menu */}
      <View style={{ paddingTop: 35 }}>
        <Text style={{ fontWeight: '600', fontSize: 18 }}>Allergier:</Text>
        {userAllergiesList.length > 0 ?

          <View>
            {userAllergiesList.map((item, index) => {
              return (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Text> {item.allergi}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      deleteAllergi({ id: item.id })
                    }}
                  >
                    <Ionicons name="trash-outline" size={22} color="#FF9C9C" />
                  </TouchableOpacity>
                </View>
              )
            })}
          </View>

          :

          <Text>Ingen allergi registreret</Text>
        }

        <View style={{ paddingVertical: 5 }}></View>

        <TextInput
          style={style.input}
          onChangeText={(al) => {
            setCreateAllergiAtr({ userId: session.id, allergi: al })
          }}
        >
        </TextInput>

        <AuthPressable
          text='Tilføj en allergi'
          color='#86DB9D'
          onPress={() => {
            if (createAllergiAtr.allergi != '') {
              createAllergi(createAllergiAtr);
            }
          }}
        />
        <View style={{ paddingVertical: 5 }}></View>
      </View>


      {/* Her displayes opskrifter der er skrevet af brugeren, som også fungere som et link til SelectedReciopeScreen */}
      <View style={{ paddingTop: 150 }}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Authored recipes:</Text>
        {userRecipeList.length > 0 ?
          <>
            <View>
              <FlatList horizontal={true} data={fetchedRecipesByUserId.data?.recipes || []} renderItem={({ item, index }) => {
                return (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("SelectedRecipeScreen", {
                          id: item.id,
                          name: item.name,
                          type: item.type,
                          prepTime: item.prepTime,
                          estimatedPrice: item.estimatedPrice,
                          numberOfPersons: item.numberOfPersons,
                          description: item.description,
                          userId: item.userId,
                        })
                      }}
                    >
                      <View style={{ paddingEnd: Dimensions.get("window").width / 100 * 2 }}>
                        <View style={style.authoredRecipes}>
                          <Text>Navn: {item.name}</Text>
                          <Text>Type: {item.type}</Text>
                          <Text>Ca. pris: {item.estimatedPrice}</Text>
                          <Text>{item.description}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </>
                )
              }} />
            </View>

          </>

          :

          <Text style={{ textAlign: 'center', paddingVertical: 15 }}>Lav din første opskrift idag!</Text>
        }


        {/* Opret ny opskrfit  */}
        <View style={{ paddingVertical: 10 }}></View>

        <AuthPressable
          text='Ny opskrift'
          color='#86DB9D'
          onPress={() => {
            navigation.navigate("CreateRecipe", { userId: session.id })
          }}
        />


      </View>

    </ViewContainer >
  )
}

const style = StyleSheet.create({
  authoredRecipes: {
    backgroundColor: "rgb(247,247,255)",
    width: Dimensions.get("window").width / 100 * 94,
    borderRadius: 15,
    paddingVertical: 8,
    minHeight: 150,
    maxHeight: 150,
    overflowY: 'scroll',
    padding: 10
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderColor: 'rgb(242,242,242)',
  }
})

export default MyPageScreen