import React, { useState } from 'react'
import { Text, View, Pressable } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useCreateMutation } from '../../redux/services/RecipeAPI'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import ViewContainer from '../../components/ViewContainer'
import Header from '../../components/Header'
import BackArrowContainer from '../../components/BackArrowContainer'
import { Ionicons } from '@expo/vector-icons';


type CreateRecipeScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'CreateRecipe'>
type CreateRecipeScreenRouteProps = RouteProp<MyPageNavigationParameters, 'CreateRecipe'>

type CreateRecipeScreenProps = {
    navigation: CreateRecipeScreenNavigationProps
    route: CreateRecipeScreenRouteProps
}

const CreateRecipeScreen: React.FC<CreateRecipeScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)

    const [create] = useCreateMutation();
    const [createAtr, setCreateAtr] = useState<{ name: string, type: string, prepTime: number, numberOfPersons: number, estimatedPrice: number, userId: number }>
        ({ name: "", type: "", prepTime: 0, numberOfPersons: 0, estimatedPrice: 0, userId: session.id });


    return (
        <ViewContainer>

            <BackArrowContainer>
                <Pressable onPress={() => {
                    navigation.pop();
                }}>
                    <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                </Pressable>
            </BackArrowContainer>

            <Header
                text='Ny opskrift'
            />

        </ViewContainer>
    )
}

export default CreateRecipeScreen
