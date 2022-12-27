import { StackNavigationProp } from '@react-navigation/stack' // Import af StackNavigatonProp (Del af template projektet)
import { RouteProp } from '@react-navigation/native' // Import af RouteProp (Del af template projektet)
import { startSession } from '../../redux/slices/sessionSlice' // Import af startSession (Del af template projeketet)
import { useDispatch } from 'react-redux' // Import af useDispatch (Del af template projektet)
import React from 'react' // Import af React
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native' // Import af react-native komponenter
import { AuthNavigationParameters } from "../../Types/Navigation_types" // Import af min AuthNavigationParameters type
import ViewContainer from "../../components/ViewContainer" // Import af min view container komponent
import AuthPressable from "../../components/AuthPressable" // Import af min auth knap

// Sætter navigations & route props
type WelcomeScreenNavigationProps = StackNavigationProp<AuthNavigationParameters, 'Welcome'>
type WelcomeScreenRouteProps = RouteProp<AuthNavigationParameters, 'Welcome'>

type WelcomeScreenProps = {
  navigation: WelcomeScreenNavigationProps
  route: WelcomeScreenRouteProps
}


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation, route }) => {

  // Bruges til at at starte en session for en gæst
  const dispatch = useDispatch();

  return (
    <ViewContainer>

        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 150, marginLeft: 20}}>
          <Image style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height / 100 * 20 }} source={require('../../assets/forsidebillede.png')} />
        </View>
      

      <AuthPressable
        text='Login'
        color='#86C3F7'
        onPress={() => {
          navigation.navigate('Login')
        }}
      />

      <View style={{ paddingVertical: 7 }}></View>

      <AuthPressable
        text='Opret'
        color='#86C3F7'
        onPress={() => {
          navigation.navigate('Register')
        }}
      />

      <TouchableOpacity
        onPress={ () => {
          dispatch(startSession({id: 0, token: 'guest', fullName: 'guest', email: 'guest'}))
        }}
      >
        <Text style={{textAlign: 'center', fontStyle: 'italic', fontWeight: '600', paddingVertical: 15}}> Fortsæt som gæst</Text>
      </TouchableOpacity>

    </ViewContainer>
  )
}

export default WelcomeScreen