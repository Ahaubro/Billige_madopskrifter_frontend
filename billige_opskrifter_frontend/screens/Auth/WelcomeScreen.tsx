import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Pressable, Text, View, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { AuthNavigationParameters } from "../../Types/Navigation_types"
import ViewContainer from "../../components/ViewContainer"
import AuthPressable from "../../components/AuthPressable"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { startSession } from '../../redux/slices/sessionSlice'
import PriceComponent from '../../components/PriceComponent'


type WelcomeScreenNavigationProps = StackNavigationProp<AuthNavigationParameters, 'Welcome'>
type WelcomeScreenRouteProps = RouteProp<AuthNavigationParameters, 'Welcome'>


type WelcomeScreenProps = {
  navigation: WelcomeScreenNavigationProps
  route: WelcomeScreenRouteProps
}


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation, route }) => {

  const session = useSelector((state: RootState) => state.session)
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
          dispatch(startSession({id: 0, token: 'guest'}))
        }}
      >
        <Text style={{textAlign: 'center', fontStyle: 'italic', fontWeight: '600', paddingVertical: 15}}> Fortsæt som gæst</Text>
      </TouchableOpacity>

    </ViewContainer>
  )
}

export default WelcomeScreen