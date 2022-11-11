import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/Home/HomeScreen'
import SettingsScreen from '../screens/Settings/SettingsScreen'
import MyPageScreen from "../screens/MyPage/MyPageScreen"
import Ionicons from '@expo/vector-icons/Ionicons'
import AuthNavigator from "./AuthNavigator"
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'


interface NavigationProps { }

const Tab = createBottomTabNavigator()

const Navigation: React.FC<NavigationProps> = () => {

  const session = useSelector((state: RootState) => state.session);

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
      background: 'white'
    },
  };

  return (
    <NavigationContainer theme={customTheme}>
      <Tab.Navigator
        screenOptions={ ({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline'
            } else if (route.name === 'AuthNavigator') {
              iconName = focused ? 'key-sharp' : 'key-outline'
            }else if (route.name === 'MyPage') {
              iconName = focused ? 'person-outline' : 'person-outline'
            }

            return <Ionicons name={iconName as any} size={size} color={color} />
          },
        })}
      >

        {session.token && session.token != 'abcdefg' &&
          <>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name='MyPage' component={MyPageScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </>
        }
          
        
        {session.token == 'abcdefg' &&
          <Tab.Screen name="AuthNavigator" component={AuthNavigator} options={{ tabBarStyle: { display: 'none' } }}/>
        }


      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
