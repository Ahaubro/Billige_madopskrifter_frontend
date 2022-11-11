import {createStackNavigator} from '@react-navigation/stack'
import MyPageScreen from '../../screens/MyPage/MyPageScreen';
import CreateRecipeScreen from '../../screens/Recipe/CreateRecipeScreen';
import { MyPageNavigationParameters } from '../../Types/Navigation_types';


const stack = createStackNavigator<MyPageNavigationParameters>();

export default function Auth_navigator(){
    
    return (
        <stack.Navigator
            initialRouteName='MyPage'
            screenOptions={{ headerShown: false }}
        >
            <stack.Screen name='MyPage' component={MyPageScreen}/>
            <stack.Screen name="CreateRecipe" component={CreateRecipeScreen} />

        </stack.Navigator>
    ) 
}