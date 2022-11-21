import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../../screens/Auth/Loginscreen';
import WelcomeScreen from '../../screens/Auth/WelcomeScreen';
import RegisterScreen from '../../screens/Auth/RegisterScreen';
import { AuthNavigationParameters } from '../../Types/Navigation_types'

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