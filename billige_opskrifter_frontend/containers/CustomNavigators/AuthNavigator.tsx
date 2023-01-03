import {createStackNavigator} from '@react-navigation/stack' // Importere createStackNavigator (Del af template projektet)
import LoginScreen from '../../screens/Auth/Loginscreen'; // Import af min loginScreen
import WelcomeScreen from '../../screens/Auth/WelcomeScreen'; // Import af min WelcomeScreen
import RegisterScreen from '../../screens/Auth/RegisterScreen'; // Import af RegisterScreen
import { AuthNavigationParameters } from '../../Types/Navigation_types' // Import af auth navigations parametre 

const stack = createStackNavigator<AuthNavigationParameters>();

export default function Auth_navigator(){
    
    return (
        <stack.Navigator
            initialRouteName='Welcome'
            screenOptions={{ headerShown: false }}
        >
            <stack.Screen name="Welcome" component={WelcomeScreen} />
            <stack.Screen name="Login" component={LoginScreen} />
            <stack.Screen name="Register" component={RegisterScreen} />

        </stack.Navigator>
    ) 
}