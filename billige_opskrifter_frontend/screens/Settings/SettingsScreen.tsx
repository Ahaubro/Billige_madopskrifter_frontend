import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigationProp (Del af template projektet)
import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af templatye projektet)
import React, { useEffect, useState } from 'react' // Import af funktionelle komponenter fra React 
import { Text, View, Pressable, StyleSheet, TouchableOpacity, Dimensions } from 'react-native' // Import af react-native komponenter
import { useDispatch, useSelector } from 'react-redux' // Import af useDispatch & useSelector (Del af template projektet)
import BackArrowContainer from '../../components/BackArrowContainer' // Import af min back arrow container komponent
import { RootState } from '../../redux/store' // Import af RootState (Del af template projektet)
import { MyPageNavigationParameters } from '../../Types/Navigation_types' // Import af min my page navigations parameters type
import { Ionicons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/
import Header from '../../components/Header' // Import af min header komponent
import AuthPressable from '../../components/AuthPressable' // Import af min knap komponent
import { endSession } from '../../redux/slices/sessionSlice' // Import af endSession (Del af template projektet)
import ViewContainer from "../../components/ViewContainer" // Import af min view container komponent
import { useGetAllergiesByUserIdQuery, useDeleteAllergiMutation, Allergi } from "../../redux/services/AllergiAPI" // Import af funktionalitet og type fra mit AllergiAPI
import { MaterialIcons } from '@expo/vector-icons'; // Import af ikoner fra expo icons -> https://icons.expo.fyi/

// Sætter navigations & route props
type SettingsScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'Settings'>
type SettingsScreenRouteProps = RouteProp<MyPageNavigationParameters, 'Settings'>

type SettingsScreenProps = {
  navigation: SettingsScreenNavigationProps
  route: SettingsScreenRouteProps
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {

  // Instantiere et session objekt
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

  //Expand allergies
  const [isExpanded, setIsExpanded] = useState(false);
  let allergiListCopy = [...userAllergiesList]

  while (allergiListCopy.length > 2) {
    allergiListCopy.pop();
  }

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
      <Text style={{ fontWeight: '600', fontStyle: 'italic', paddingTop: 15, paddingBottom: 5 }}>Mine allergier:</Text>
      <View style={style.card}>

        {userAllergiesList.length > 0 ?
          <View>
            {!isExpanded &&
              <>
                {allergiListCopy.map((item, index) => {
                  return (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                      <Text style={{ paddingTop: 10, fontWeight: '500' }}> - {item.allergi} </Text>
                      <TouchableOpacity
                        onPress={() => {
                          deleteAllergi({ id: item.id })
                        }}
                      >
                        <Ionicons style={{ paddingTop: 10 }} name="trash-outline" size={20} color="#FF9C9C" />
                      </TouchableOpacity>
                    </View>
                  )
                })}

                <TouchableOpacity
                  onPress={() => {
                    setIsExpanded(true)
                  }}
                >
                  {userAllergiesList.length > 2 &&
                    <MaterialIcons style={{ textAlign: 'center' }} name="expand-more" size={24} color="grey" />
                  }
                </TouchableOpacity>

                <View style={style.addAllergiView}>
                  <TouchableOpacity
                    style={style.addAllergi}
                    onPress={() => {
                      navigation.navigate("AddAllergiScreen")
                    }}

                  >
                    <Text style={{ textAlign: 'center', paddingHorizontal: 15, paddingVertical: 10, color: 'white', fontWeight: '600' }}> Tilføj en allergi</Text>
                  </TouchableOpacity>
                </View>
              </>
            }

          </View>
          :

          <>
            <Text style={{ textAlign: 'center', paddingTop: 20, fontStyle: 'italic', fontWeight: '600' }}>Ingen allergi registreret</Text>

            <View style={style.addAllergiView}>
              <TouchableOpacity
                style={style.addAllergi}
                onPress={() => {
                  navigation.navigate("AddAllergiScreen")
                }}

              >
                <Text style={{ textAlign: 'center', paddingHorizontal: 15, paddingVertical: 10, color: 'white', fontWeight: '600' }}> Tilføj en allergi</Text>
              </TouchableOpacity>
            </View>
          </>
        }


        {isExpanded &&
          <>
            {userAllergiesList.map((item, index) => {
              return (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                  <Text style={{ paddingTop: 10, fontWeight: '500' }}> - {item.allergi} </Text>
                  <TouchableOpacity
                    onPress={() => {
                      deleteAllergi({ id: item.id })
                    }}
                  >
                    <Ionicons style={{ paddingTop: 10 }} name="trash-outline" size={20} color="#FF9C9C" />
                  </TouchableOpacity>
                </View>
              )
            })}
            <TouchableOpacity
              onPress={() => {
                setIsExpanded(false)
              }}
            >
              <MaterialIcons style={{ textAlign: 'center' }} name="expand-less" size={24} color="grey" />

            </TouchableOpacity>

            <View style={style.addAllergiView}>
              <TouchableOpacity
                style={style.addAllergi}
                onPress={() => {
                  navigation.navigate("AddAllergiScreen")
                }}

              >
                <Text style={{ textAlign: 'center', paddingHorizontal: 15, paddingVertical: 10, color: 'white', fontWeight: '600' }}> Tilføj en allergi</Text>
              </TouchableOpacity>
            </View>
          </>
        }

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
    minHeight: Dimensions.get("window").height / 100 * 10,
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
  },
  addAllergiView: {
    paddingTop: 15,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SettingsScreen
