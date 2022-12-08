import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Text, View, Pressable, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BackArrowContainer from '../../components/BackArrowContainer'
import { RootState } from '../../redux/store'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header'
import AuthPressable from '../../components/AuthPressable'
import { endSession } from '../../redux/slices/sessionSlice'
import ViewContainer from "../../components/ViewContainer"
import { useCreateAllergiMutation, useGetAllergiesByUserIdQuery, useDeleteAllergiMutation, Allergi } from "../../redux/services/AllergiAPI"


type SettingsScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'Settings'>
type SettingsScreenRouteProps = RouteProp<MyPageNavigationParameters, 'Settings'>

type SettingsScreenProps = {
  navigation: SettingsScreenNavigationProps
  route: SettingsScreenRouteProps
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation, route }) => {

  const session = useSelector((state: RootState) => state.session)
  const dispatch = useDispatch();

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

  return (
    <ViewContainer>

      <BackArrowContainer>
        <Pressable onPress={() => {
          navigation.pop();
        }}>
          <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
        </Pressable>
      </BackArrowContainer>

      <Header
        text='Indstillinger'
      />

      <Text style={style.menuHeader}>Mine informationer.</Text>
      <View style={{ paddingTop: 15, flexDirection: 'row' }}>
        <Text style={{ fontWeight: '600', fontStyle: 'italic' }}>Fulde navn: </Text>
        <Text>{session.fullName}</Text>

      </View>

      <View style={{ paddingTop: 15, flexDirection: 'row' }}>
        <Text style={{ fontWeight: '600', fontStyle: 'italic' }}>Email: </Text>
        <Text>{session.email}</Text>
      </View>


      {/* Allergies menu */}
      <Text style={style.menuHeader}>Overblik over allergier.</Text>
      <View style={style.card}>
        {userAllergiesList.length > 0 ?

          <View>
            {userAllergiesList.map((item, index) => {
              return (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Text> #{index + 1} {item.allergi} allergiker</Text>
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

        <View style={{ paddingTop: 50, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={style.addAllergi}
            onPress={() => {
              navigation.navigate("AddAllergiScreen")
            }}

          >
            <Text style={{ textAlign: 'center', paddingHorizontal: 15, paddingVertical: 10, color: 'white', fontWeight: '600' }}> Tilføj en allergi</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingTop: 20 }}>
        <AuthPressable
          text='Log ud'
          color='#FF9C9C'
          onPress={() => {
            dispatch(endSession());
          }}
        />
      </View>

    </ViewContainer>
  )
}

const style = StyleSheet.create({
  menuHeader: {
    paddingTop: 50,
    fontWeight: '700',
    fontSize: 18
  },
  card: {
    backgroundColor: "rgb(247,247,255)",
    width: Dimensions.get("window").width / 100 * 94,
    borderRadius: 15,
    paddingVertical: 8,
    minHeight: 150,
    maxHeight: 150,
    overflowY: 'scroll',
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 5
  },
  addAllergi: {
    backgroundColor: '#86C3F7',
    borderRadius: 10,
    maxWidth: Dimensions.get('window').width / 100 * 65
  }
})

export default SettingsScreen
