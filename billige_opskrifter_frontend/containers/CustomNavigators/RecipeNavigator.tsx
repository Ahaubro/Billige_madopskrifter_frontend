import {createStackNavigator} from '@react-navigation/stack' // Importere createStackNavigator (Del af template prjektet)
// Nedenfor importeres de skærm komponenter der skal kunne tilgås af RecipeNavigator samt RecipeNavigationParameters 
//der definere hvilke parametre de forskellige skærm komponenter bruger
import AddExtraIngredientAfterCreationScreen from '../../screens/Recipe/AddExtraIngredientAfterCreationScreen';
import AddIngredientScreen from '../../screens/Recipe/AddIngredientScreen';
import ChooseRecipeScreen from '../../screens/Recipe/ChooseRecipeScreen';
import CreateReviewScreen from '../../screens/Reviews/CreateReviewScreen';
import RecipesScreen from '../../screens/Recipe/RecipesScreen';
import SelectedRecipeScreen from '../../screens/Recipe/SelectedRecipeScreen';
import { RecipeNavigationParameters } from '../../Types/Navigation_types';
import AllReviewsScreen from '../../screens/Reviews/AllReviewsScreen';
import HomeScreen from '../../screens/Home/HomeScreen';



const stack = createStackNavigator<RecipeNavigationParameters>();

export default function RecipeNavigator(){
    
    return (
        <stack.Navigator
            initialRouteName='ChooseRecipe'
            screenOptions={{ headerShown: false }}
        >
            <stack.Screen name='ChooseRecipe' component={ChooseRecipeScreen}/>
            <stack.Screen name='RecipesScreen' component={RecipesScreen}/>
            <stack.Screen name='SelectedRecipeScreen' component={SelectedRecipeScreen}/>
            <stack.Screen name='AddIngredient' component={AddIngredientScreen}/>
            <stack.Screen name='CreateReviewScreen' component={CreateReviewScreen} />
            <stack.Screen name="AddExtraIngredientAfterCreationScreen" component={AddExtraIngredientAfterCreationScreen}/>
            <stack.Screen name='AllReviewsScreen' component={AllReviewsScreen}/>
        </stack.Navigator>
    ) 
}