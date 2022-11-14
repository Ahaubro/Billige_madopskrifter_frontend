import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Text, View, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BackArrowContainer from '../../components/BackArrowContainer'
import { RootState } from '../../redux/store'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header'
import AuthPressable from '../../components/AuthPressable'
import { endSession } from '../../redux/slices/sessionSlice'
import ViewContainer from "../../components/ViewContainer"


type SettingsScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'Settings'>
type SettingsScreenRouteProps = RouteProp<MyPageNavigationParameters, 'Settings'>

type SettingsScreenProps = {
  navigation: SettingsScreenNavigationProps
  route: SettingsScreenRouteProps
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation, route }) => {

  const session = useSelector((state: RootState) => state.session)
  const dispatch = useDispatch();

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

      <View style={{paddingTop: 20}}>
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

export default SettingsScreen
