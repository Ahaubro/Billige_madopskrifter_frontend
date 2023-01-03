// Der var allerede opsat navigareing som del af template projektet der er vedhæftet som bilag (Navigation.tsx var en del af template projektet - Men ikoner og Tab.Screens er løbende blevet tilføjet)
import { NavigationContainer, DefaultTheme } from '@react-navigation/native' // Import af navigation comtainer (Del af template projektet) - samt import af Default theme
import React from 'react' // Import af React 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' // Import af createBottomTabNavigator (Del af template projektet)
import Ionicons from '@expo/vector-icons/Ionicons' // Import af ikoner fra expo icons
import { useSelector } from 'react-redux' // Import af useSelector (Del af template projektet)
import { RootState } from '../redux/store' // Import af RootState (Del af template projektet)
// Nedenfor importeres mine customNavigators der bruges i selve navigationsbaren
import HomeNavigator from "./CustomNavigators/HomeNavigator" 
import MyPageNavigator from "./CustomNavigators/MyPageNavigtor"
import AuthNavigator from "./CustomNavigators/AuthNavigator"
import RecipeNavigator from './CustomNavigators/RecipeNavigator'
import IngredientSearchNavigator from './CustomNavigators/IngredientSearchNavigator'


interface NavigationProps { }

const Tab = createBottomTabNavigator()

const Navigation: React.FC<NavigationProps> = () => {

  const session = useSelector((state: RootState) => state.session);

  // Sætter et custom theme for at ændre baggrundsfarven på hele applikationen
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

            // Her fordeles ikoner ud fra route name (Del af template projektet - men redigeret efter behov)
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
            } else if(route.name === 'IngredientSearchNavigator'){
              iconName = focused ? 'shuffle' : 'shuffle'
            }

            return <Ionicons name={iconName as any} size={size} color={color} />
          },
        })}
      >

        {/* Nedenfor sættes navigationsbaren hvis man er logget ind som bruger */}
        {session.token && session.token != 'abcdefg' && session.token != "guest" &&
          <>
            <Tab.Screen name="HomeNavigator" component={HomeNavigator} options={{ title: "Hjem" }} />
            <Tab.Screen name='RecipeNavigator' component={RecipeNavigator} options={{ title: "Opskrifter" }} />
            <Tab.Screen name="IngredientSearchNavigator" component={IngredientSearchNavigator} options={{title: "Ingrediens menu"}} />
            <Tab.Screen name='MyPageNavigator' component={MyPageNavigator} options={{ title: "Min side" }} />
          </>
        }

        {/* Nedenfor sættes navigationsbaren hvis man ikke er logget ind */}
        {!session.token &&
          <Tab.Screen name="AuthNavigator" component={AuthNavigator} options={{ tabBarStyle: { display: 'none' } }} />
        }

        {/* Nedenfor sættes navigationsbaren hvis man er logget ind som gæst */}
        {session.token == "guest" &&
          <>
            <Tab.Screen name='RecipeNavigator' component={RecipeNavigator} options={{ title: "Opskrifter" }} />
            <Tab.Screen name="IngredientSearchNavigator" component={IngredientSearchNavigator} options={{title: "Ingrediens menu"}} />
          </>
        }


      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
