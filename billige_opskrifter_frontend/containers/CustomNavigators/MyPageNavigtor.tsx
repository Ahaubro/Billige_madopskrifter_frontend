import {createStackNavigator} from '@react-navigation/stack'
import MyPageScreen from '../../screens/MyPage/MyPageScreen';
import AddIngredientScreen from '../../screens/Recipe/AddIngredientScreen';
import AddRecipeDescriptionScreen from '../../screens/Recipe/AddRecipeDescription';
import CreateRecipeScreen from '../../screens/Recipe/CreateRecipeScreen';
import CreateReviewScreen from '../../screens/Recipe/CreateReviewScreen';
import SelectedRecipeScreen from '../../screens/Recipe/SelectedRecipeScreen';
import SettingsScreen from '../../screens/Settings/SettingsScreen';
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
            <stack.Screen name="Settings" component={SettingsScreen} />
            <stack.Screen name="AddIngredient" component={AddIngredientScreen} />
            <stack.Screen name="AddRecipeDescription" component={AddRecipeDescriptionScreen} />
            <stack.Screen name="SelectedRecipeScreen" component={SelectedRecipeScreen} />
            <stack.Screen name="CreateReviewScreen" component={CreateReviewScreen} />

        </stack.Navigator>
    ) 
}