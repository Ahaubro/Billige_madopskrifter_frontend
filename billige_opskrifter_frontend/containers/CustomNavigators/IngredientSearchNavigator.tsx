import { createStackNavigator } from '@react-navigation/stack'
import IngredientSearchResultScreen from '../../screens/IngredientSearchMenu/IngredientSearchResultScreen';
import IngredientSearchScreen from '../../screens/IngredientSearchMenu/IngredientSearchScreen';
import AddExtraIngredientAfterCreationScreen from '../../screens/Recipe/AddExtraIngredientAfterCreationScreen';
import CreateReviewScreen from '../../screens/Reviews/CreateReviewScreen';
import SelectedRecipeScreen from '../../screens/Recipe/SelectedRecipeScreen';
import { IngredientSearchNavigationParameters } from '../../Types/Navigation_types';
import AllReviewsScreen from '../../screens/Reviews/AllReviewsScreen';




const stack = createStackNavigator<IngredientSearchNavigationParameters>();

export default function IngredientSearchNavigator(){
    
    return (
        <stack.Navigator
            initialRouteName='IngredientSearchScreen'
            screenOptions={{ headerShown: false }}
        >
            <stack.Screen name="IngredientSearchScreen" component={IngredientSearchScreen} />
            <stack.Screen name="IngredientSearchResultScreen" component={IngredientSearchResultScreen} />
            <stack.Screen name='SelectedRecipeScreen' component={SelectedRecipeScreen}/>
            <stack.Screen name="AddExtraIngredientAfterCreationScreen" component={AddExtraIngredientAfterCreationScreen}/>
            <stack.Screen name="CreateReviewScreen" component={CreateReviewScreen} />
            <stack.Screen name='AllReviewsScreen' component={AllReviewsScreen}/>


        </stack.Navigator>
    ) 
}