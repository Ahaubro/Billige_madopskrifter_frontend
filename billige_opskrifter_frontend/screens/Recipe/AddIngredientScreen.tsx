import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Header from '../../components/Header'
import ViewContainer from "../../components/ViewContainer"
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import { useGetRecipesByNameAndUserIdQuery } from "../../redux/services/RecipeAPI"
import { useCreateMutation } from '../../redux/services/IngredientAPI'
import AuthPressable from '../../components/AuthPressable'

type AddIngredientScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'AddIngredient'>
type AddIngredientScreenRouteProps = RouteProp<MyPageNavigationParameters, 'AddIngredient'>

type CreateRecipeScreenProps = {
    navigation: AddIngredientScreenNavigationProps
    route: AddIngredientScreenRouteProps
}


const AddIngredientScreen: React.FC<CreateRecipeScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)
    const { name } = route.params;

    const [thisRecipeAtr] = useState<{ userId: number, name: string }>({ userId: session.id, name: name })
    const thisRecipe = useGetRecipesByNameAndUserIdQuery(thisRecipeAtr, { refetchOnMountOrArgChange: true });
    let recipeId: number = 0

    if (thisRecipe.data != undefined) {
        recipeId = thisRecipe.data.id
    }


    const [addIngredient] = useCreateMutation();
    const [addIngredientAtr, setAddIngredientAtr] = useState<{ recipeId: number, name: string, type: string, measurementUnit: string, amount: number, alergene: string }>
        ({ recipeId: 0, name: "", type: "", measurementUnit: "", amount: 0, alergene: "" });

    // const nameRef = useRef(null);
    // const typeRef = useRef(null);
    // const measureUnitRef = useRef(null);
    // const amountRef = useRef(null);
    // const alerRef = useRef(null);

    // const handleSubmit = () => {
    //     nameRef.current.value = ""
    //     typeRef.current.value = ""
    //     measureUnitRef.current.value = ""
    //     amountRef.current.value = ""
    //     alerRef.current.value = ""
    // }

    return (
        <ViewContainer>

            <Header
                text="Tilføj ingredienser"
            />

            <Text style={style.label}>Navn på ingrediensen:</Text>
            <TextInput 
                //ref={nameRef}
                style={style.input}
                onChangeText={(name) => {
                    addIngredientAtr.name = name
                }}
            >
            </TextInput>

            <Text style={style.label}>Ingrediens type:</Text>
            <TextInput 
                //ref={typeRef}
                style={style.input}
                onChangeText={(type) => {
                    addIngredientAtr.type = type
                }}
            >
            </TextInput>

            <Text style={style.label}>Måle enhed (gr, kg,  ml, l):</Text>
            <TextInput 
                //ref={measureUnitRef}
                style={style.input}
                onChangeText={(mu) => {
                    addIngredientAtr.measurementUnit = mu
                }}
            >
            </TextInput>

            <Text style={style.label}>Mængde:</Text>
            <TextInput 
                //ref={amountRef}
                style={style.input}
                onChangeText={(amount) => {
                    addIngredientAtr.amount = Number(amount)
                }}

            >
            </TextInput>

            <Text style={style.label}>Alergener:</Text>
            <TextInput 
                //ref={alerRef}
                style={style.input}
                onChangeText={(alergene) => {
                    addIngredientAtr.alergene = alergene
                }}
            >
            </TextInput>

            <View style={{paddingTop: 10}}></View>

            <AuthPressable
                text='Gem og lav beskrivelse'
                color='#86DB9D'
                onPress={() => {
                    if (recipeId != 0) {
                        addIngredientAtr.recipeId = recipeId
                        addIngredient(addIngredientAtr).unwrap().then(res => {
                            console.log(res)
                        })
                        navigation.navigate("AddRecipeDescription", {recipeId})
                    }
                }}
            />

            <View style={{paddingTop: 10}}></View>

            <AuthPressable
                text='Ny ingrediens'
                color='#86DB9D'
                onPress={() => {
                    if (recipeId != 0) {
                        addIngredientAtr.recipeId = recipeId
                        addIngredient(addIngredientAtr).unwrap().then(res => {
                            console.log(res)
                        })
                        //handleSubmit();
                    }

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
        borderColor: 'rgb(240,240,240)',
    }
})

export default AddIngredientScreen
