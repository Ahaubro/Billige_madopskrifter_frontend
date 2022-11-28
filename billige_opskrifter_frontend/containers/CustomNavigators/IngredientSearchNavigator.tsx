import { createStackNavigator } from '@react-navigation/stack'
import IngredientSearchResultScreen from '../../screens/IngredientSearchMenu/IngredientSearchResultScreen';
import IngredientSearchScreen from '../../screens/IngredientSearchMenu/IngredientSearchScreen';
import { IngredientSearchNavigationParameters } from '../../Types/Navigation_types';




const stack = createStackNavigator<IngredientSearchNavigationParameters>();

export default function IngredientSearchNavigator(){
    
    return (
        <stack.Navigator
            initialRouteName='IngredientSearchScreen'
            screenOptions={{ headerShown: false }}
        >
            <stack.Screen name="IngredientSearchScreen" component={IngredientSearchScreen} />
            <stack.Screen name="IngredientSearchResultScreen" component={IngredientSearchResultScreen} />

        </stack.Navigator>
    ) 
}