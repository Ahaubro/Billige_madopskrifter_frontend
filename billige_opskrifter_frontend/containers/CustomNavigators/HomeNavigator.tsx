import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../../screens/Home/HomeScreen';
import AddExtraIngredientAfterCreationScreen from '../../screens/Recipe/AddExtraIngredientAfterCreationScreen';
import CreateReviewScreen from '../../screens/Recipe/CreateReviewScreen';

import SelectedRecipeScreen from '../../screens/Recipe/SelectedRecipeScreen';
import { HomeNavigationParameters } from '../../Types/Navigation_types';




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

        </stack.Navigator>
    ) 
}