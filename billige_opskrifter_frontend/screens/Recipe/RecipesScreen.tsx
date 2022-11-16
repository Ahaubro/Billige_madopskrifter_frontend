import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import HeaderWithoutBack from '../../components/HeaderWithoutBack'
import ViewContainer from "../../components/ViewContainer"
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RecipeNavigationParameters } from '../../Types/Navigation_types'
import BackArrowContainer from '../../components/BackArrowContainer'
import { Ionicons } from '@expo/vector-icons';


type RecipesScreenNavigationProps = StackNavigationProp<RecipeNavigationParameters, 'RecipesScreen'>
type RecipesScreenRouteProps = RouteProp<RecipeNavigationParameters, 'RecipesScreen'>

type RecipesScreenProps = {
    navigation: RecipesScreenNavigationProps
    route: RecipesScreenRouteProps
}


const RecipesScreen: React.FC<RecipesScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)

    const { type } = route.params

    console.log(type)

    return (
        <ViewContainer>

            <BackArrowContainer>
                <Pressable onPress={() => {
                    navigation.pop();
                }}>
                    <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                </Pressable>
            </BackArrowContainer>

            <HeaderWithoutBack
                text={type}
            />



        </ViewContainer>
    )
}

const style = StyleSheet.create({

})

export default RecipesScreen
