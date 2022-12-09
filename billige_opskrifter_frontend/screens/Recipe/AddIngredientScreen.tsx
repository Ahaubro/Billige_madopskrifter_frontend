import React, { useState, useEffect, useRef } from 'react'
import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Header from '../../components/Header'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { MyPageNavigationParameters } from '../../Types/Navigation_types'
import { useGetRecipesByNameAndUserIdQuery, useDeleteRecipeMutation } from "../../redux/services/RecipeAPI"
import { Ingredient, useCreateMutation, useGetByRecipeIdQuery, useDeleteIngredientMutation } from '../../redux/services/IngredientAPI'
import AuthPressable from '../../components/AuthPressable'
import { Ionicons } from '@expo/vector-icons';
import ScrollViewContainer from '../../components/ScrollViewContainer'
import { getType } from '@reduxjs/toolkit'
import HeaderWithoutBackcontainer from '../../components/HeaderWithoutBackcontainer'


type AddIngredientScreenNavigationProps = StackNavigationProp<MyPageNavigationParameters, 'AddIngredient'>
type AddIngredientScreenRouteProps = RouteProp<MyPageNavigationParameters, 'AddIngredient'>

type CreateRecipeScreenProps = {
    navigation: AddIngredientScreenNavigationProps
    route: AddIngredientScreenRouteProps
}



const AddIngredientScreen: React.FC<CreateRecipeScreenProps> = ({ navigation, route }) => {

    const session = useSelector((state: RootState) => state.session)
    const { name } = route.params;


    //Getting recipe to add ingredients
    const [thisRecipeAtr] = useState<{ userId: number, name: string }>({ userId: session.id, name: name })
    const thisRecipe = useGetRecipesByNameAndUserIdQuery(thisRecipeAtr, { refetchOnMountOrArgChange: true });
    let recipeId: number = 0

    if (thisRecipe.data != undefined) {
        recipeId = thisRecipe.data.id
    }


    //Add ingredient props
    const [addIngredient] = useCreateMutation();
    const [addIngredientAtr, setAddIngredientAtr] = useState<{ recipeId: number, name: string, type: string, measurementUnit: string, amount: number, alergene: string }>
        ({ recipeId: 0, name: "", type: "", measurementUnit: "", amount: 0, alergene: "" });


    //Getting ingredients that have been made for this recipe for the user to see
    const thisRecipesIngredients = useGetByRecipeIdQuery(recipeId);
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);

    useEffect(() => {
        if (thisRecipesIngredients.data) {
            setIngredientsList(thisRecipesIngredients.data.ingredients)
        }
    })


    // Delete ingredient & recipe
    const [deleteIngredient] = useDeleteIngredientMutation();
    const [deleteRecipe] = useDeleteRecipeMutation();


    // Clear textInputs når man tilføjer yderligere ingredienser
    const nameRef = useRef<TextInput>(null);
    const typeRef = useRef<TextInput>(null);
    const measureUnitRef = useRef<TextInput>(null);
    const amountRef = useRef<TextInput>(null);
    const alerRef = useRef<TextInput>(null);


    const handleSubmit = () => {
        nameRef.current?.clear();
        typeRef.current?.clear();
        measureUnitRef.current?.clear();
        amountRef.current?.clear();
        alerRef.current?.clear();
    }


    return (
        <ScrollViewContainer>

            <HeaderWithoutBackcontainer
                text="Tilføj ingredienser"
            />

            <KeyboardAvoidingView
                behavior='position'
                keyboardVerticalOffset={Dimensions.get("window").height / 100 * 1}
                style={{ height: Dimensions.get("window").height / 100 * 80, width: Dimensions.get("window").width / 100 * 94, minWidth: Dimensions.get("window").width / 100 * 94 }}
            >


                <View>
                    {ingredientsList.length != 0 ?
                        <View style={{ paddingVertical: 5 }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '700', paddingVertical: 10 }}>Tilføjede ingredienser</Text>
                            {ingredientsList.map((item, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 1 }}>
                                        <Text style={{ fontWeight: '700', fontSize: 16 }}>#{index + 1}</Text>
                                        <Text style={{ fontSize: 16 }}> {item.name} {item.amount}{item.measurementUnit}</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                deleteIngredient({ id: item.id })
                                            }}
                                        >
                                            <Ionicons name="trash-outline" size={22} color="#FF9C9C" />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                            }
                        </View>
                        :

                        <Text style={{ textAlign: 'center', paddingVertical: 15 }}>Du har ikke tilføjet ingredienser til opskriften endnu</Text>
                    }
                </View>




                <Text style={style.label}>Navn på ingrediensen:</Text>
                <TextInput
                    editable={true}
                    ref={nameRef}
                    placeholder="Ingrediens navn"
                    style={style.input}
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        typeRef.current?.focus();
                    }}
                    onChangeText={(name) => {
                        addIngredientAtr.name = name
                    }}
                >
                </TextInput>

                <Text style={style.label}>Ingrediens type:</Text>
                <TextInput
                    placeholder="Eks. Tilbehør"
                    ref={typeRef}
                    style={style.input}
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        amountRef.current?.focus();
                    }}
                    onChangeText={(type) => {
                        addIngredientAtr.type = type
                    }}
                >
                </TextInput>

                <Text style={style.label}>Mængde:</Text>
                <TextInput
                    placeholder="Eks. 250"
                    ref={amountRef}
                    keyboardType="number-pad"
                    style={style.input}
                    returnKeyType='done'
                    onSubmitEditing={() => {
                        measureUnitRef.current?.focus();
                    }}
                    onChangeText={(amount) => {
                        addIngredientAtr.amount = Number(amount)
                    }}

                >
                </TextInput>

                <Text style={style.label}>Måle enhed (gr, kg,  ml, l):</Text>
                <TextInput
                    placeholder='Eks. stk'
                    ref={measureUnitRef}
                    style={style.input}
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        alerRef.current?.focus();
                    }}
                    onChangeText={(mu) => {
                        addIngredientAtr.measurementUnit = mu
                    }}
                >
                </TextInput>

                <Text style={style.label}>Alergener:</Text>
                <TextInput
                    placeholder="Eks. Laktose"
                    ref={alerRef}
                    style={style.input}
                    onChangeText={(alergene) => {
                        addIngredientAtr.alergene = alergene
                    }}
                >
                </TextInput>

                <View style={{ paddingTop: 10 }}></View>

                <AuthPressable
                    text='Ny ingrediens'
                    color='#86DB9D'
                    onPress={() => {
                        if (recipeId != 0) {
                            console.log(addIngredientAtr)
                            addIngredientAtr.recipeId = recipeId
                            addIngredient(addIngredientAtr).unwrap().then(res => {
                                //Refresh
                            })
                            handleSubmit();
                        }

                    }}
                />

                <View style={{ paddingTop: 10 }}></View>

                <AuthPressable
                    text='Gem og lav beskrivelse'
                    color='#86DB9D'
                    onPress={() => {
                        if (recipeId != 0) {
                            addIngredientAtr.recipeId = recipeId
                            ingredientsList.map((item) => {
                                //Hvis ingrediensen allerede er tilføjet sendes vi videre, ellers tilføjes den nye ingrediens først
                                if (item.name === addIngredientAtr.name) {
                                    navigation.navigate("AddRecipeDescription", { recipeId })
                                } else {
                                    addIngredient(addIngredientAtr).unwrap().then(res => {
                                        console.log(res)
                                    })
                                    navigation.navigate("AddRecipeDescription", { recipeId })
                                }
                            })
                        }
                    }}
                />

                <View style={{ paddingTop: 10 }}></View>

                <AuthPressable
                    text='Afbryd'
                    color='#FF9C9C'
                    onPress={() => {
                        if (recipeId != 0) {
                            deleteRecipe({ recipeId: recipeId }).unwrap().then(() => {
                                navigation.navigate('MyPage')
                            })
                        }
                    }}
                />

            </KeyboardAvoidingView>
            
            <View style={{ paddingTop: 50 }}></View>

        </ScrollViewContainer>

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
    },
})

export default AddIngredientScreen
