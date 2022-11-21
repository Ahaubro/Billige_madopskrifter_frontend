import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeNavigator from "./CustomNavigators/HomeNavigator"
import MyPageNavigator from "./CustomNavigators/MyPageNavigtor"
import Ionicons from '@expo/vector-icons/Ionicons'
import AuthNavigator from "./CustomNavigators/AuthNavigator"
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import RecipeNavigator from './CustomNavigators/RecipeNavigator'


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
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'HomeNavigator') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline'
            } else if (route.name === 'AuthNavigator') {
              iconName = focused ? 'key-sharp' : 'key-outline'
            } else if (route.name === 'MyPageNavigator') {
              iconName = focused ? 'person-outline' : 'person-outline'
            } else if (route.name === 'RecipeNavigator') {
              iconName = focused ? 'ios-fast-food-outline' : 'ios-fast-food-outline'
            }

            return <Ionicons name={iconName as any} size={size} color={color} />
          },
        })}
      >

        {session.token && session.token != 'abcdefg' &&
          <>
            <Tab.Screen name="HomeNavigator" component={HomeNavigator} options={{ title: "Hjem" }} />
            <Tab.Screen name='RecipeNavigator' component={RecipeNavigator} options={{ title: "Opskrifter" }} />
            <Tab.Screen name='MyPageNavigator' component={MyPageNavigator} options={{ title: "Min side" }} />
          </>
        }

        {session.token == 'abcdefg' &&
          <Tab.Screen name="AuthNavigator" component={AuthNavigator} options={{ tabBarStyle: { display: 'none' } }} />
        }

        {!session.token &&
          <Tab.Screen name="AuthNavigator" component={AuthNavigator} options={{ tabBarStyle: { display: 'none' } }} />
        }


      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
