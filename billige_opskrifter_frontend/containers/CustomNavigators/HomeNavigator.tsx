import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../../screens/Home/HomeScreen';
import AddExtraIngredientAfterCreationScreen from '../../screens/Recipe/AddExtraIngredientAfterCreationScreen';
import ChooseRecipeScreen from '../../screens/Recipe/ChooseRecipeScreen';
import CreateReviewScreen from '../../screens/Reviews/CreateReviewScreen';
import RecipesScreen from '../../screens/Recipe/RecipesScreen';

import SelectedRecipeScreen from '../../screens/Recipe/SelectedRecipeScreen';
import { HomeNavigationParameters } from '../../Types/Navigation_types';
import AllReviewsScreen from '../../screens/Reviews/AllReviewsScreen';




const stack = createStackNavigator<HomeNavigationParameters>();

export default function HomeNavigator(){
    
    return (
        <stack.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{ headerShown: false }}
        >
            <stack.Screen name="HomeScreen" component={HomeScreen} />
            <stack.Screen name="SelectedRecipeScreen" component={SelectedRecipeScreen} />
            <stack.Screen name="AddExtraIngredientAfterCreationScreen" component={AddExtraIngredientAfterCreationScreen}/>
            <stack.Screen name="CreateReviewScreen" component={CreateReviewScreen} />
            <stack.Screen name='ChooseRecipe' component={ChooseRecipeScreen} />
            <stack.Screen name='RecipesScreen' component={RecipesScreen}/>
            <stack.Screen name='AllReviewsScreen' component={AllReviewsScreen}/>


        </stack.Navigator>
    ) 
}