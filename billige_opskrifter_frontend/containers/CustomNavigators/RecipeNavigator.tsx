import {createStackNavigator} from '@react-navigation/stack'
import ChooseRecipeScreen from '../../screens/Recipe/ChooseRecipeScreen';
import RecipesScreen from '../../screens/Recipe/RecipesScreen';
import SelectedRecipeScreen from '../../screens/Recipe/SelectedRecipeScreen';
import { RecipeNavigationParameters } from '../../Types/Navigation_types';



const stack = createStackNavigator<RecipeNavigationParameters>();

export default function Auth_navigator(){
    
    return (
        <stack.Navigator
            initialRouteName='ChooseRecipe'
            screenOptions={{ headerShown: false }}
        >
            <stack.Screen name='ChooseRecipe' component={ChooseRecipeScreen}/>
            <stack.Screen name='RecipesScreen' component={RecipesScreen}/>
            <stack.Screen name='SelectedRecipeScreen' component={SelectedRecipeScreen}/>

        </stack.Navigator>
    ) 
}