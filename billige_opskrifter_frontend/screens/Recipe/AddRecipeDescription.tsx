import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Header from '../../components/Header'
import ViewContainer from "../../components/ViewContainer"
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import { useEditMutation } from "../../redux/services/RecipeAPI"
import AuthPressable from '../../components/AuthPressable'

type AddRecipeDescriptionScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'AddRecipeDescription'>
type AddRecipeDescriptionScreenRouteProps = RouteProp<MyPageNavigationParameters, 'AddRecipeDescription'>

type AddRecipeDescriptionScreenProps = {
    navigation: AddRecipeDescriptionScreenNavigationProps
    route: AddRecipeDescriptionScreenRouteProps
}

const AddRecipeDescriptionScreen: React.FC<AddRecipeDescriptionScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)
    const { recipeId } = route.params;

    const [edit] = useEditMutation();

    const [editAtr] = useState<{ description: string, id: number }>({ description: "", id: recipeId })


    return (
        <ViewContainer>

            <Header
                text="Tilføj beskrivelse"
            />

            <Text style={style.label}>Beskriv fremgangs metoden:</Text>
            <TextInput 
                multiline={true}
                style={style.input}
                onChangeText={(des) => {
                    editAtr.description = des
                }}
            >
            </TextInput>

            <View style={{paddingTop: 10}}></View>

            <AuthPressable
                text='Gem opskrift'
                color='#86DB9D'
                onPress={() => {
                    edit(editAtr).unwrap().then(res => {
                        console.log(res)
                    })
                    navigation.navigate("MyPage")

                }}
            />



        </ViewContainer>
    )
}

const style = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: '600',
        paddingVertical: 5
    },
    input: {
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        minHeight: 250,
        borderColor: 'rgb(240,240,240)',
    }
})

export default AddRecipeDescriptionScreen