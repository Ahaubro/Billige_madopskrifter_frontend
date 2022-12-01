import { StackNavigationProp } from "@react-navigation/stack"
import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native"
import { useCreateMutation } from "../../redux/services/IngredientAPI"
import { MyPageNavigationParameters } from "../../Types/Navigation_types"
import AuthPressable from "../../components/AuthPressable"
import { RouteProp } from "@react-navigation/native"
import BackArrowContainer from "../../components/BackArrowContainer"
import { Ionicons } from '@expo/vector-icons';
import Header from "../../components/Header"
import ViewContainer from "../../components/ViewContainer"

type AddIngredientComponentNavigationProps = StackNavigationProp<MyPageNavigationParameters, "AddExtraIngredientAfterCreationScreen">
type SelectedRecipeScreenRouteProps = RouteProp<MyPageNavigationParameters, 'AddExtraIngredientAfterCreationScreen'>

type AddIngredientComponentProps = {
    navigation: AddIngredientComponentNavigationProps
    route: SelectedRecipeScreenRouteProps
}

const AddIngredientComponent: React.FC<AddIngredientComponentProps> = ({ navigation, route }) => {

    const { recipeId } = route.params;

    const [newIngrAtr, setNewIngrAtr] = useState<{ recipeId: number, name: string, type: string, measurementUnit: string, amount: number, alergene: string }>
        ({ recipeId: recipeId, name: '', type: '', measurementUnit: '', amount: 0, alergene: '' });
    const [addIngredient] = useCreateMutation();

    return (
        <ViewContainer>

            <BackArrowContainer>
                <Pressable onPress={() => {
                    navigation.pop();
                }}>
                    <Text> <Ionicons name="chevron-back-sharp" size={28} color="black" /> </Text>
                </Pressable>
            </BackArrowContainer>

            <View style={{paddingVertical: 5, paddingBottom: 15}}>
                <Header 
                    text="Tilføj en ekstra ingrediens"
                />
            </View>

            
            
            <Text style={style.label}>Navn på ingrediensen:</Text>
            <TextInput
                style={style.input}
                onChangeText={(name) => {
                    newIngrAtr.name = name
                }}
            >
            </TextInput>

            <Text style={style.label}>Ingrediens type:</Text>
            <TextInput
                style={style.input}
                onChangeText={(type) => {
                    newIngrAtr.type = type
                }}
            >
            </TextInput>

            <Text style={style.label}>Måle enhed (gr, kg,  ml, l):</Text>
            <TextInput
                style={style.input}
                onChangeText={(mu) => {
                    newIngrAtr.measurementUnit = mu
                }}
            >
            </TextInput>

            <Text style={style.label}>Mængde:</Text>
            <TextInput
                style={style.input}
                onChangeText={(amount) => {
                    newIngrAtr.amount = Number(amount)
                }}

            >
            </TextInput>

            <Text style={style.label}>Alergener:</Text>
            <TextInput
                style={style.input}
                onChangeText={(alergene) => {
                    newIngrAtr.alergene = alergene
                }}
            >
            </TextInput>

            <View style={{ paddingTop: 10 }}></View>

            <AuthPressable
                text='Gem'
                color='#86DB9D'
                onPress={() => {
                    newIngrAtr.recipeId = recipeId
                    console.log(newIngrAtr)
                    addIngredient(newIngrAtr)
                    navigation.pop();
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
    },
})

export default AddIngredientComponent;
