import {createStackNavigator} from '@react-navigation/stack'
import AddAllergiScreen from '../../screens/Allergi/AddAllergiScreen';
import MyPageScreen from '../../screens/MyPage/MyPageScreen';
import AddIngredientScreen from '../../screens/Recipe/AddIngredientScreen';
import AddRecipeDescriptionScreen from '../../screens/Recipe/AddRecipeDescription';
import CreateRecipeScreen from '../../screens/Recipe/CreateRecipeScreen';
import CreateReviewScreen from '../../screens/Reviews/CreateReviewScreen';
import SelectedRecipeScreen from '../../screens/Recipe/SelectedRecipeScreen';
import SettingsScreen from '../../screens/Settings/SettingsScreen';
import AddExtraIngredientAfterCreationScreen from "../../screens/Recipe/AddExtraIngredientAfterCreationScreen"
import { MyPageNavigationParameters } from '../../Types/Navigation_types';
import AllReviewsScreen from '../../screens/Reviews/AllReviewsScreen';




const stack = createStackNavigator<MyPageNavigationParameters>();

export default function MyPageNavigator(){
    
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
            <stack.Screen name="AddAllergiScreen" component={AddAllergiScreen}/>
            <stack.Screen name="AddExtraIngredientAfterCreationScreen" component={AddExtraIngredientAfterCreationScreen}/>
            <stack.Screen name='AllReviewsScreen' component={AllReviewsScreen}/>

        </stack.Navigator>
    ) 
}